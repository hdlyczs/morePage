var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
	entry:{
			main:'./src/js/main.js',
			public:'./src/js/public.js'
		},
	mode:'development',
	output:{
		path:path.join(__dirname,'dist'),
		filename:'js/[name].js'
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
        new webpack.HotModuleReplacementPlugin()
	],
	resolve:{
		alias: { 
			'vue': 'vue/dist/vue.js' 
		}
	}
}