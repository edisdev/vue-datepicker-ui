module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{js,vue}']
}
