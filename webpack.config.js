const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
    ...defaultConfig,

    entry: {
        'editor' : path.resolve( process.cwd(), 'src/editor.js' ),
        'frontend': path.resolve( process.cwd(), 'src/frontend.js' ),
        'main': path.resolve( process.cwd(), 'src/main.css' ),
        'styles': path.resolve( process.cwd(), 'src/styles.css' ),
    },

    output: {
        filename: '[name].js',
        path: path.resolve( process.cwd(), 'build/' ),
    },

    plugins: [
        ...defaultConfig.plugins,

        new RemoveEmptyScriptsPlugin(),
    ],
};