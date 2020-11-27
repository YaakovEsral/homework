const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        app: {
            import: './src/index.js',
            dependOn: 'shared'
        },
        imports: {
            import: './src/imports.js',
            dependOn: 'shared'
        },
        shared: 'jquery'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins:
        [
            // new ESLintPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'My Webpack APP test',
                date: `${new Date().getMonth()} / ${new Date().getDate()} / ${new Date().getFullYear()} `,
                template: './src/index.html'
            })
        ],
    target: ['web', 'es5'],
    devtool: 'source-map',
    // watch: true,
    // devServer: {
    //     contentBase: './dist'
    // },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    }
};