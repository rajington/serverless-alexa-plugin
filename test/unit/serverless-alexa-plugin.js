import Serverless from 'serverless';
import ServerlessAlexaPlugin from '../../src/serverless-alexa-plugin';

describe('ServerlessAlexaPlugin', () => {
  let serverless;
  let alexaPlugin;

  beforeEach(() => {
    serverless = new Serverless();
    serverless.service.resources = { Resources: {} };
    alexaPlugin = new ServerlessAlexaPlugin(serverless);
    alexaPlugin.serverless.service.service = 'new-service';
  });

  describe('#constructor()', () => {
    it('should set the provider variable to "aws"', () =>
      expect(
        alexaPlugin.provider
      ).to.equal('aws'));
  });

  describe('#compileAlexaEvents()', () => {
    it('should throw an error if the resource section is not available', () => {
      alexaPlugin.serverless.service.resources.Resources = false;
      expect(() => alexaPlugin.compileAlexaEvents()).to.throw(Error);
    });

    it('should create corresponding resources when ask events are given', () => {
      alexaPlugin.serverless.service.functions = {
        first: {
          events: [
            'ask',
          ],
        },
      };

      alexaPlugin.compileAlexaEvents();

      expect(alexaPlugin.serverless.service
        .resources.Resources.firstAlexaSkillsKitEventPermission0.Type
      ).to.equal('AWS::Lambda::Permission');
    });

    it('should not create corresponding resources when ask events are not given', () => {
      alexaPlugin.serverless.service.functions = {
        first: {
          events: [],
        },
      };

      alexaPlugin.compileAlexaEvents();

      expect(
        alexaPlugin.serverless.service.resources.Resources
      ).to.deep.equal({});
    });
  });
});
