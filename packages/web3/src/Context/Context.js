import Provider from '@/class/Provider';
import Events from '@/Events';
import PluginsFactory from './PluginsFactory';

export default class Context {
  constructor(props) {
    const { netUrl, plugins } = props;

    const pluginProps = {
      context: this,
      ...props,
    };

    this.provider = new Provider(netUrl);
    this.events = new Events(plugins, pluginProps);
    this.plugins = PluginsFactory.create(pluginProps);
  }

  destroy() {
    this.events.off();
    this.provider.destroy();
  }
}
