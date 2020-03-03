export interface Ports {
  [key: string]: Port;
}

export interface Message {
  action: string;
  args?: any[];
  tabId?: number;
  [key: string]: any;
}

export type Port = chrome.runtime.Port;

export type Action = (...args: any[]) => any;

export interface Actions {
  [key: string]: Action;
}
