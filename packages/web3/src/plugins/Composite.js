import BasePlugin from './BasePlugin';
import { PLUGINS } from '@/constants';

export default class CompositePlugin extends BasePlugin {
  static pluginName = PLUGINS.COMPOSITE;
}
