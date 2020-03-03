export interface Ports {
  [key: string]: Port;
}

export interface Message {
  tabId?: string;
  action: string;
}

export type Port = chrome.runtime.Port;

export type Action = (...args: any[]) => any;

export interface Actions {
  [key: string]: Action;
}
