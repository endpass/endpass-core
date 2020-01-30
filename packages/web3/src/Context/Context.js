import Provider from '@/class/Provider';
import Events from '@/Events';
import PluginsFactory from './PluginsFactory';

export default class Context {
  constructor(props) {
    const { netUrl } = props;

    this.provider = new Provider(netUrl);
    this.events = new Events();

    this.plugins = PluginsFactory.create(this, {
      context: this,
      ...props,
    });
  }

  destroy() {
    this.events.off();
    this.provider.destroy();
  }
}
