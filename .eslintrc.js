module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    ignorePatterns: ['serviceWorker.js', 'App.test.jsx'],

    extends: ['plugin:react/recommended', 'airbnb'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
    },
    plugins: ['react'],
    rules: {},
};