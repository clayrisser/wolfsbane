export default class DevToolsGlue {
  constructor(port, tabId) {
    this.port = port;
    this.tabId = tabId;
    this.postMessage = this.port.postMessage;
  }

  logger = {
    log: (...props) => this.postMessage({ action: 'log', level: 'log', props }),
    info: (...props) =>
      this.postMessage({ action: 'log', level: 'info', props }),
    warn: (...props) =>
      this.postMessage({ action: 'log', level: 'warn', props }),
    debug: (...props) =>
      this.postMessage({ action: 'log', level: 'debug', props })
  };
}
