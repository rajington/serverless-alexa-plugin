import serverlessAlexaPlugin from '../../src/serverless-alexa-plugin';

describe('serverlessAlexaPlugin', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(serverlessAlexaPlugin, 'greet');
      serverlessAlexaPlugin.greet();
    });

    it('should have been run once', () => {
      expect(serverlessAlexaPlugin.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(serverlessAlexaPlugin.greet).to.have.always.returned('hello');
    });
  });
});
