## [Serverless Framework now supports Alexa Events directly, without this plugin!](https://serverless.com/framework/docs/providers/aws/events/alexa-skill/)

# Serverless Alexa Events

[![Travis build status](http://img.shields.io/travis/rajington/serverless-alexa-plugin.svg?style=flat)](https://travis-ci.org/rajington/serverless-alexa-plugin)
[![Code Climate](https://codeclimate.com/github/rajington/serverless-alexa-plugin/badges/gpa.svg)](https://codeclimate.com/github/rajington/serverless-alexa-plugin)
[![Test Coverage](https://codeclimate.com/github/rajington/serverless-alexa-plugin/badges/coverage.svg)](https://codeclimate.com/github/rajington/serverless-alexa-plugin)
[![Dependency Status](https://david-dm.org/rajington/serverless-alexa-plugin.svg)](https://david-dm.org/rajington/serverless-alexa-plugin)
[![devDependency Status](https://david-dm.org/rajington/serverless-alexa-plugin/dev-status.svg)](https://david-dm.org/rajington/serverless-alexa-plugin#info=devDependencies)

This plugins compiles the Alexa Skills Kit events to a CloudFormation resource.

It requires Serverless 1.0 or later.

## How it works

`Compile Alexa Skills Kit Events` hooks into the [`deploy:compileEvents`](/lib/plugins/deploy) lifecycle.

It loops over all functions which are defined in `serverless.yaml`. For each function that have Alexa
events defined, a lambda permission for the current function is created which makes is possible to invoke the
function when the skill is spoken.

Take a look at the [Event syntax examples](#event-syntax-examples) below to see how you can setup an Alexa Skills Kit event.

The resource is then merged into the `serverless.service.resources.Resources` section.

## Event syntax examples

Enable Alexa Skills Kit event:

```yaml
# serverless.yaml
functions:
    greet:
        handler: handler.hello
        events:
            - alexaSkillsKit
```

## TODO:

I do not believe Alexa Smart Home events are possible via CloudFormation, although they are supported via [command-line](http://docs.aws.amazon.com/cli/latest/reference/lambda/add-permission.html?highlight=event-source-token) and [SDK](https://github.com/aws/aws-sdk-js/blob/master/apis/lambda-2015-03-31.normal.json#L474).

It may require creating a separate policy to be linked, will have to investigate. The plugin accepts the value and supplies it to CloudFormation, but it currently fails.

Configure Alexa Smart Home event:

```yaml
# serverless.yaml
functions:
    greet:
        handler: handler.hello
        events:
            - alexaSmartHome: amzn1.ask.skill.12345678-1234-4234-8234-9234567890AB
```
