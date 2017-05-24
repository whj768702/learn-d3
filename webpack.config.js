const openBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [path.resolve(__dirname,'src/index.js')],
    output: {
        path: path.resolve(__dirname,'dist'),
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
        publicPath: '/dist',
        contentBase: path.join(__dirname, 'src'),
        hot: false
    },
    plugins: [
        new openBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]    
};