import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import dotenv from 'dotenv';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

dotenv.config(); // dotenv 설정 적용

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  name: 'mq-navigator3.0client',
  mode: isDevelopment ? 'development' : 'production',
  // devtool: !isDevelopment ? 'hidden-source-GoogleMap' : 'eval',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@slices': path.resolve(__dirname, 'src/slices'),
      '@typings': path.resolve(__dirname, 'src/typings'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: './src/index',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['IE 10'] },
                // targets: { browsers: ['last 2 versions', 'not dead'] }, // 최신 브라우저로 타겟 변경
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REACT_APP_API_SERVER': JSON.stringify(process.env.REACT_APP_API_SERVER),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    // new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'public/dist'), // public 폴더 내에 dist 폴더 생성
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true, // react router
    port: 3090,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname, 'public') }, // 'public/'에서 정적 파일 제공
    proxy: [
      {
        context: ['/api'],
        // target: 'http://localhost:8080',
        // target: 'http://백엔드_IP:8080',
        // target: 'https://백엔드_IP:8080',
        target: process.env.REACT_APP_API_SERVER || 'http://localhost:8080',
        changeOrigin: true,
      },
    ],
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' })); // html 로 정리
}

export default config;
