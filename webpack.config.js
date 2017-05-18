var path = require('path');
require("babel-core/register");
require("babel-polyfill");

module.exports = {

    entry: ["babel-polyfill",  path.resolve(__dirname, 'src') + '/app/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
