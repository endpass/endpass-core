module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': {
        'browsers': ['> 1%', 'last 2 versions']
      },
      'modules': false
    }]
  ],
  env: {
    'test': {
      'presets': ['@babel/preset-env'],
      'plugins': [
        ['dynamic-import-node']
      ]
    }
  }
}