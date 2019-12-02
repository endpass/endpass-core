import BasePlugin from '../BasePlugin';
import BalanceEvent from './BalanceEvent';
import { PLUGINS } from '@/web3Constants';

export default class BalancePlugin extends BasePlugin {
  static pluginName = PLUGINS.BALANCE;

  static Events = [BalanceEvent];
}
