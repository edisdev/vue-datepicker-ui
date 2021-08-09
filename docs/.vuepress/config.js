const { path } = require('@vuepress/utils')

module.exports = {
  title: 'Vue Datepicker UI',
  base: '/vue-datepicker-ui/',
  dest: 'build',
  description: 'A datepicker component for Vuejs.',
  head: [['link', { rel: 'icon', href: 'favicon.ico' }]],
  themeConfig: {
    prefersTheme: 'dark',
    sidebar: {
      '/': [
        {
          title: 'GETTING STARTED',
          collapsable: false,
          children: ['installation', 'using', 'props'],
        },
        {
          title: 'EXAMPLES',
          collapsable: false,
          children: ['examples'],
        },
        {
          title: 'Style Customize',
          collapsable: false,
          children: ['custom-style'],
        }
      ]
    },
    repo: 'edisdev/vue-datepicker-ui',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true,
  },
  bundler: '@vuepress/webpack',
  bundlerConfig: {
    chainWebpack(config) {
      config.resolve.alias.set('@', '../../src')
    }
  }
};
