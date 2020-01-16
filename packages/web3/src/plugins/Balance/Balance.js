import BasePlugin from '@/plugins/BasePlugin';
import { PLUGINS } from '@/constants';
import BalanceEvent from './BalanceEvent';

export default class BalancePlugin extends BasePlugin {
  static pluginName = PLUGINS.BALANCE;

  static Events = [BalanceEvent];
}
