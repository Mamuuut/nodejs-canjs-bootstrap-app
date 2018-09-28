var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR   = path.resolve(__dirname, 'dist');
var CLIENT_DIR = path.resolve(__dirname, 'src');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    'filename' : '[name].css'
});

module.exports = {
    'cache' : true,

    'devtool' : 'cheap-module-source-map',

    'context' : CLIENT_DIR,

    'entry' : './main',

    'resolve' : {
        'modules' : [
            'node_modules'
        ]
    },

    'module' : {
        'rules' : [
            {
                'test' : /\.less$/,
                'use'  : extractLess.extract({
                    'use' : [
                        {
                            'loader' : 'css-loader'
                        },
                        {
                            'loader' : 'less-loader'
                        }
                    ],
                    // use style-loader in development
                    'fallback' : 'style-loader'
                })
            },
            {
                'test' : /\.stache$/,
                'use'  : {
                    'loader' : 'raw-loader'
                }
            },
            {
                'test' : /\.svg/,
                'use'  : {
                    'loader'  : 'svg-url-loader',
                    'options' : {}
                }
            },
            {
                'test' : /\.(scss)$/,
                'use'  : [
                    {
                        'loader' : 'style-loader' // inject CSS to page
                    },
                    {
                        'loader' : 'css-loader' // translates CSS into CommonJS modules
                    },
                    {
                        'loader'  : 'postcss-loader', // Run post css actions
                        'options' : {
                            'plugins' : function ()
                            { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        'loader' : 'sass-loader' // compiles Sass to CSS
                    }
                ]
            }
        ]
    },

    'output' : {
        'path'     : DIST_DIR,
        'filename' : 'bundle.js'
    },

    'plugins' : [
        extractLess,
        new HtmlWebpackPlugin({
            'template' : 'index.html'
        })
    ]
};