module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Personaliza tus reglas aquí
    'no-console': 'off',
    'import/extensions': 'off',
    'object-curly-newline': 'off',
    'consistent-return': 'off',
  },
};
