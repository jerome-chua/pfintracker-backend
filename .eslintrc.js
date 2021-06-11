module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'brace-style': 'off',
    'import/extensions': ['error', 'ignorePackages'],
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};