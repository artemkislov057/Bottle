const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './index.js'),
    },
    mode:'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.bundle.js',
    } 
}