import registerRequireContextHook from 'babel-plugin-require-context-hook/register'; // eslint-disable-line
import initStoryshots from '@storybook/addon-storyshots';

registerRequireContextHook();
initStoryshots();
