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
    entry: {
        'MainPage' : './src/pages/MainPage/MainPage',        
        'testSwipe': "./src/pages/testSwipe/testSwipe"        
    },    
    mode:'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        // filename: 'bundle.js',
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [       
        new HTMLWebpackPlugin({            
            // filename: 'MainPage.html',
            template: "src/pages/MainPage/MainPage.html",
            chunks: ['MainPage']
        }),
        new HTMLWebpackPlugin({
            filename: 'testSwipe.html',
            template: "src/pages/testSwipe/testSwipe.html",           
            chunks: ['testSwipe']
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
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
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