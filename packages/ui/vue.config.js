module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    output: {
      libraryExport: '',
    },
    module: {
      rules: [
        {
          test: /\.(svg)(\?.*)?$/,
          loader: 'svg-inline-loader',
        }
      ],
    },
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .test(() => false)
      .use('file-loader');
  },
};
