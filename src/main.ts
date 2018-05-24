//mainを他に分けたので空です。
import 'babel-polyfill';
import './blockly-main';
import * as enchantMain from './enchant-main';

enchantMain.init();
enchantMain.start();
