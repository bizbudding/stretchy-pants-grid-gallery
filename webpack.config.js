const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    ...defaultConfig,

    entry: {
        'frontend': path.resolve(process.cwd(), 'src/js/frontend.js'), // Main JS file for frontend
        'index': path.resolve(process.cwd(), 'src/js/index.js'), // Main JS file for block registration
        'editor': path.resolve(process.cwd(), 'src/css/editor.css'), // CSS for the editor
    },

    output: {
        ...defaultConfig.output,
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js', // Output JS files named according to entry keys
    },

    plugins: [
        ...defaultConfig.plugins,
        new RemoveEmptyScriptsPlugin(), // Remove any empty JS files
        new MiniCssExtractPlugin({
            filename: '[name].css', // Output CSS files named according to entry keys
        }),
    ],

    optimization: {
        splitChunks: false, // Disable code splitting
        runtimeChunk: false, // Disable runtime chunk
    },
};