//人民路217号 萧山流动人口管理中心 20号以后去下
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
	entry:{
			main:'./src/js/main.js',
			public:'./src/js/public.js'
		},
	mode:'development',
	output:{
		path:path.join(__dirname,'dist'),
		filename:'js/[name].js',
		publicPath: '/'
	},
	devServer:{
		contentBase: './dist',
		inline:true,
		port:8000
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:"babel-loader",
				query:{
					presets:['env']
				}
			},
			{
				test:/\.css$/,
				loader: ExtractTextPlugin.extract({
		            fallback: 'style-loader',
		            use: ['css-loader']
		        })
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader:'url-loader',
				query:{
					limit: 10000,
					name: "images/[name].[hash].[ext]"
				}
			},
			{
		    	test: /\.(woff|woff2|eot|ttf|otf)$/,
		        use: ["url-loader"]
		    },
			{
				test: /\.html$/,
				loader:"html-loader",
				query:{
					attrs: ['img:src', 'link:href'],
					interpolate: true
				}
			}
		]
	},
	plugins:[		
        new HtmlWebpackPlugin({
			filename:'public.html',
            template: './src/public.html',
            chunks:['public']
        }),
        new HtmlWebpackPlugin({
			filename:'main.html',
            template: './src/main.html',
            chunks:['main']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css"),
	],
	resolve:{
		alias: { 
			'vue': 'vue/dist/vue.js' 
		}
	}
}