import Wolfsbane from '.';
import { Actions } from './types';

export function registerContentScript() {
  const wolfsbane = new Wolfsbane();
  wolfsbane.port.onMessage.addListener(message => {
    const actions: Actions = {
      log() {
        return ((console as unknown) as Actions)[message.level || 'log'](
          ...message.args
        );
      }
    };
    const action = actions[message.action];
    return action();
  });
  wolfsbane.logger.info('howdy');
}
