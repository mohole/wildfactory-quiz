// Webpack configuration
module.exports = {
  // Input & output
  entry: './src/index.js',
  output: {
    filename: './dist/bundle.js'
  },
  module: {
    // Babel loader configuration
    loaders: [{
      test: /\.js?$/,
      exclude: ['node_modules', 'dist/bundle.js'],
      loader: 'babel-loader',
      query: {
        presets: ['es2015','react']
      }
    }]
  }
}
