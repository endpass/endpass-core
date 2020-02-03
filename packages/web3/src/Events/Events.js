export default class Events {
  constructor(plugins = [], props) {
    this.eventPluginsMap = {};
    plugins.forEach(pluginClass => {
      this.addEvents(pluginClass.Events, props);
    });
  }

  addEvents(PluginEventsList, props) {
    PluginEventsList.forEach(EventPlugin => {
      const { eventName } = EventPlugin;
      if (this.eventPluginsMap[eventName]) {
        throw new Error(`Plugin event "${eventName}" already exists!`);
      }
      const eventInstance = new EventPlugin(props);
      Object.assign(this.eventPluginsMap, {
        [eventName]: eventInstance,
      });
    });
  }

  on(methodName, data, cb) {
    const eventPlugin = this.eventPluginsMap[methodName];
    if (!eventPlugin) {
      throw new Error(`Method "${methodName}" is not defined for subscribe`);
    }

    if (!cb) {
      throw new Error(`Not defined callback for subscribe in "${methodName}" `);
    }

    eventPlugin.on(data, cb);
    return () => {
      this.off(methodName, cb);
    };
  }

  off(methodName, cb) {
    const eventPlugin = this.eventPluginsMap[methodName];

    if (methodName) {
      eventPlugin.off(cb);
      return;
    }

    Object.keys(this.eventPluginsMap).forEach(methodKey => {
      this.eventPluginsMap[methodKey].off();
    });
  }
}
