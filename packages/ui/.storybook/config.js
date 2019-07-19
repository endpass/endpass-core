import Vue from 'vue';
import { configure } from '@storybook/vue';
import '@/kit.theme-default';
import ThemeProvider from '@/kit/ThemeProvider';
import './storybook.css';

Vue.component('theme-provider', ThemeProvider);

function loadStories() {
  const req = require.context('../stories', true, /\.stories\.js$/);

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
