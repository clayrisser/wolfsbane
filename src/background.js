const connections = {};

function postMessage(tabId, message) {
  if (tabId in connections) return connections[tabId].postMessage(message);
}

chrome.runtime.onConnect.addListener(port => {
  function handleMessage(message, sender, sendResponse) {
    const tabId =
      message.tabId ||
      (typeof port.sender.tab !== 'undefined' ? port.sender.tab.id : null);
    (action =>
      ({
        log: () => postMessage(tabId, message),
        register: () => (connections[port.sender.tab.id] = port)
      }[action]))(message.action)();
  }
  port.onMessage.addListener(handleMessage);
  port.onDisconnect.addListener(port => {
    port.onMessage.removeListener(handleMessage);
    Object.keys(connections).forEach(tabId => {
      if (connections[tabId] == port) delete connections[tabId];
    });
  });
});
