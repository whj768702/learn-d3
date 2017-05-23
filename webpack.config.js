const openBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                include: [path.resolve(__dirname, 'src')],
                loader: 'html-loader'
            }
        ]
    },
    devServer: {
        publicPath: '/dist'
    },
    plugins: [
        new openBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]    
};