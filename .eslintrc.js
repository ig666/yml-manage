//.eslintrc.js里的配置
module.exports = {
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended' /* eslint应用在vue的必须配置 */,
    'plugin:prettier/recommended' /* 使用Prettier */,
  ],
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser' /* 解析ts语法 */,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'vue/no-v-model-argument': 'off',
    'vue/no-multiple-template-root': 'off',
  },
};
