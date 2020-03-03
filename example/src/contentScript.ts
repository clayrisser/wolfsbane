{
  const port = chrome.runtime.connect({ name: 'content' });
  port.onMessage.addListener(message => {
    (action =>
      // @ts-ignore
      ({
        // @ts-ignore
        log: () => console[message.level || 'log'](...message.props)
      }[action]))(message.action)();
  });
  port.postMessage({ action: 'register' });
  port.postMessage({ action: 'log', props: ['howdy'] });
}
