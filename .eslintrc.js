module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint-config-prettier"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins:[
    "eslint-plugin-prettier",
    "jsx-a11y",
  
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    
  },
  rules: {
    // "semi": "error",
    // "allowImplicit": true, 
    // "no-unused-vars": ["error", {"argsIgnorePattern": "next"}],
    // "camelcase": "off",
    // "no-param-reassign":"off",
    // "class-methods-use-this": "off",
    // "arrow-body-style": ["error", "always"]
  }
};
