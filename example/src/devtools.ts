import { ExtensionPanel } from './types';

chrome.devtools.panels.create(
  'Wolfsbane',
  '',
  'wolfsbane.html',
  (_panel: ExtensionPanel) => {}
);
