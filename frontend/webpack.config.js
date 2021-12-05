const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path');


// module.exports = {
//     entry: {
//         main: path.resolve(__dirname, './index.js'),
//     },
//     mode:'production',
//     output: {
//         path: path.resolve(__dirname, './dist'),
//         filename: 'index.bundle.js',
//     } 
// }

module.exports = {
    // entry: './index.js',    
    entry: {
        main: './src/pages/MainPage/MainPage.js',
    },
    mode:'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },    
    // devServer: {
    //     port: 9000,
    //     historyApiFallback: true,
    //     hot: true,
    // },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/pages/MainPage/MainPage.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        hot: true,
        // contentBase: path.resolve(__dirname, './dist'),        
        open: true,
        compress: true,
    },
}