import Provider from '@/Provider';
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
}
