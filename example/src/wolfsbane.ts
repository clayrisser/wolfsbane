import Wolfsbane from 'wolfsbane';

const wolfsbane = new Wolfsbane(chrome.devtools.inspectedWindow.tabId);
const { logger } = wolfsbane;

logger.info('hello', 'wolfsbane');
