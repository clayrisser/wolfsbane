const tabId = chrome.devtools.inspectedWindow.tabId;
const port = chrome.runtime.connect({ name: 'content' });
port.postMessage({ action: 'log', text: 'wow', tabId });
