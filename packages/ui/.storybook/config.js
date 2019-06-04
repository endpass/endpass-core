import Vue from 'vue';
import { configure } from '@storybook/vue';
import '@/scss/main.theme-default.scss';
import ThemeProvider from '@/components/ThemeProvider';

Vue.component('theme-provider', ThemeProvider);

function loadStories() {
  const req = require.context('../stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
