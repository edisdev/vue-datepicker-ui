const path = require('path');

module.exports = {
  title: 'Vue Datepicker UI',
  base: '/vue-datepicker-ui/',
  dest: 'build',
  description: 'A datepicker component for Vuejs.',
  head: [['link', { rel: 'icon', href: 'favicon.ico' }]],
  theme: 'default-prefers-color-scheme',
  plugins: [
    [
      "@mr-hope/copy-code", {
        showInMobile: true
      }
    ]
  ],
  themeConfig: {
    prefersTheme: 'dark',
    sidebar: {
      '/': [
        {
          title: 'GETTING STARTED',
          collapsable: false,
          children: ['installation', 'using', 'props', 'events'],
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
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
  },
};
