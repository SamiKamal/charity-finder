const path = require('path')
module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module: {
        rules: [
            {
                test:/\.(png|css|scss)$/,
                exclude: /node_modules/,
                use: [
                    {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
                ]
            },
            {
                test: /\.xml$/i,
                use: 'raw-loader'
              }
        ],
    },
    devServer: {
        contentBase: './dist',
        liveReload: true,
        writeToDisk: true
    }
}