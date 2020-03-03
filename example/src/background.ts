import { Actions, Message, Port, Ports } from './types';

const connections: Ports = {};

export function postMessage(tabId: number, message: Message) {
  if (tabId in connections) {
    return connections[tabId.toString()].postMessage(message);
  }
}

chrome.runtime.onConnect.addListener((port: Port) => {
  function handleMessage(message: Message, _port: Port) {
    const tabId = (message.tabId || typeof port.sender?.tab !== 'undefined'
      ? port.sender?.tab?.id
      : null) as number | null;
    const actions: Actions = {
      log: () => (tabId ? postMessage(tabId, message) : undefined),
      register: () =>
        port.sender?.tab?.id
          ? (connections[port.sender.tab.id.toString()] = port)
          : undefined
    };
    const action = ((actionName: string) => actions[actionName])(
      message.action
    );
    return action();
  }
  port.onMessage.addListener(handleMessage);
  port.onDisconnect.addListener((port: Port) => {
    port.onMessage.removeListener(handleMessage);
    Object.keys(connections).forEach((tabIdString: string) => {
      if (connections[tabIdString] == port) delete connections[tabIdString];
    });
  });
});
