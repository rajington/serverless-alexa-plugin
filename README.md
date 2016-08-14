# Compile Alexa Skills Kit Events

This plugins compiles the Alexa Skills Kit and Alexa Smart Home events to a CloudFormation resource.

It requires Serverless 1.0 or later.

Everything should work but it is still being developed, please file any issues or PRs.

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

Configure Alexa Smart Home event:

```yaml
# serverless.yaml
functions:
    greet:
        handler: handler.hello
        events:
            - alexaSmartHome: amzn1.ask.skill.12345678-1234-4234-8234-9234567890AB
```

Alexa Voice Services events

[![Travis build status](http://img.shields.io/travis/rajington/serverless-alexa-plugin.svg?style=flat)](https://travis-ci.org/rajington/serverless-alexa-plugin)
[![Code Climate](https://codeclimate.com/github/rajington/serverless-alexa-plugin/badges/gpa.svg)](https://codeclimate.com/github/rajington/serverless-alexa-plugin)
[![Test Coverage](https://codeclimate.com/github/rajington/serverless-alexa-plugin/badges/coverage.svg)](https://codeclimate.com/github/rajington/serverless-alexa-plugin)
[![Dependency Status](https://david-dm.org/rajington/serverless-alexa-plugin.svg)](https://david-dm.org/rajington/serverless-alexa-plugin)
[![devDependency Status](https://david-dm.org/rajington/serverless-alexa-plugin/dev-status.svg)](https://david-dm.org/rajington/serverless-alexa-plugin#info=devDependencies)
