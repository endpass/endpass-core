export default class PluginsFactory {
  static create(context, props) {
    const { plugins = [] } = props;
    plugins.reduce((pluginsMap, PluginClass) => {
      const { pluginName } = PluginClass;
      if (pluginsMap[pluginName]) {
        throw new Error(`Plugin ${pluginName} already exists!`);
      }

      const pluginInstance = new PluginClass(props);

      return {
        [pluginName]: pluginInstance,
        ...pluginsMap,
      };
    }, {});
  }
}
