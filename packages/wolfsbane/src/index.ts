import { Message } from './types';

export default class Wolfsbane {
  public postMessage: (message: Message) => void;

  tabId: number | null;

  constructor(
    public port = chrome.runtime.connect({ name: 'content' }),
    tabId?: number
  ) {
    this.tabId = tabId || this.port.sender?.tab?.id || null;
    this.postMessage = this.port.postMessage;
    this.postMessage({ action: 'register' });
  }

  logger = {
    log: (...args: any[]) =>
      this.postMessage({ action: 'log', level: 'log', args }),
    info: (...args: any[]) =>
      this.postMessage({ action: 'log', level: 'info', args }),
    warn: (...args: any[]) =>
      this.postMessage({ action: 'log', level: 'warn', args }),
    debug: (...args: any[]) =>
      this.postMessage({ action: 'log', level: 'debug', args })
  };
}
