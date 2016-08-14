import { merge } from 'lodash';

class ServerlessAlexaPlugin {
  constructor(serverless) {
    this.serverless = serverless;
    this.provider = 'aws';

    this.hooks = {
      'deploy:compileEvents': this.compileAlexaEvents.bind(this),
    };
  }

  compileAlexaEvents() {
    if (!this.serverless.service.resources.Resources) {
      throw new this.serverless.classes
        .Error('This plugin needs access to Resources section of the AWS CloudFormation template');
    }

    this.serverless.service.getAllFunctions().forEach((functionName) => {
      const functionObj = this.serverless.service.getFunction(functionName);

      if (functionObj.events) {
        for (let i = 0; i < functionObj.events.length; i++) {
          const event = functionObj.events[i];
          if (event === 'alexaSkillsKit' || event.alexaSmartHome) {
            const permissionTemplate = {
              Type: 'AWS::Lambda::Permission',
              Properties: {
                FunctionName: { 'Fn::GetAtt': ['${functionName}', 'Arn'] },
                Action: 'lambda:InvokeFunction',
              },
            };

            if (event === 'alexaSkillsKit') {
              permissionTemplate.Principal = 'alexa-appkit.amazon.com';
            } else {
              if (typeof event.alexaSmartHome !== 'string') {
                const errorMessage = [
                  `Alexa Smart Home event of function ${functionName} is not a string`,
                  ' The correct syntax requires your skill\'s application ID from the',
                  ' Alexa Developer Console, example:',
                  ' alexaSmartHome: amzn1.ask.skill.12345678-1234-4234-8234-9234567890AB',
                  ' Please check the docs for more info.',
                ].join('');
                throw new this.serverless.classes
                  .Error(errorMessage);
              }
              permissionTemplate.Principal = 'alexa-connectedhome.amazon.com';
              permissionTemplate.Condition = {
                StringEquals: {
                  'lambda:EventSourceToken': event.alexaSmartHome,
                },
              };
            }

            const newPermissionObject = {
              [`${functionName}AlexaEventPermission${i}`]: permissionTemplate,
            };

            merge(this.serverless.service.resources.Resources,
              newPermissionObject);
          }
        }
      }
    });
  }
}

export default ServerlessAlexaPlugin;
