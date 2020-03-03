import { Port } from './types';

export default class Wolfsbane {
  public postMessage: (message: Object) => void;

  constructor(public port: Port, public tabId: number) {
    this.postMessage = this.port.postMessage;
  }

  logger = {
    log: (...props: any[]) =>
      this.postMessage({ action: 'log', level: 'log', props }),
    info: (...props: any[]) =>
      this.postMessage({ action: 'log', level: 'info', props }),
    warn: (...props: any[]) =>
      this.postMessage({ action: 'log', level: 'warn', props }),
    debug: (...props: any[]) =>
      this.postMessage({ action: 'log', level: 'debug', props })
  };
}
