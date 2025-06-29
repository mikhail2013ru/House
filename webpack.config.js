const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'), // Каталог для статики
          watch: true,
        },
        devMiddleware: {
          writeToDisk: true, // Это ключевая настройка
        },
        open: true, // Автоматически открывать браузер
        hot: true,  // Включить Hot Module Replacement (HMR)
        port: 8080, // Порт (по умолчанию 8080)
        watchFiles: ['src/**/*.html', 'src/**/*.scss'], // Следить за изменениями HTML
        client: {
          overlay: {
            errors: true,
            warnings: false,
          },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html', // Шаблон HTML
          filename: 'index.html',      // Имя выходного файла
          inject: 'body',
        }),
        new MiniCssExtractPlugin({
          filename: 'css/style.css', // Имя выходного CSS-файла
        }),
        new CopyPlugin({
          patterns: [
            {
              from: 'src/images',    // Откуда копировать
              to: 'images',          // Куда копировать (относительно output.path)
              noErrorOnMissing: true // Не вызывать ошибку, если файлов нет
            },
            // {
            //   from: 'src/favicon.ico',
            //   to: 'favicon.ico'
            // }
          ]
        })
    ],
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Очищать папку dist перед сборкой
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]', // Сохраняет в dist/images/
          },
        },
        {
          test: /\.s[ac]ss$/i, // Регулярка для .scss и .sass
          use: [
            // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, // Инжектит стили в DOM (для быстрой перезагрузки), Извлекает в отдельный файл (для production)
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: true, // Ищет postcss.config.js автоматически
                  plugins: [require('autoprefixer')],
                },
              },
            },
            {
              loader: 'sass-loader',   // Компилирует SASS/SCSS в CSS
              options: {
                sassOptions: {
                  quietDeps: true, // Вот здесь добавляем параметр игнора warning bootstrap 5
                  includePaths: [path.resolve(__dirname, 'src/styles')]
                }
              }
            }
          ],
          include: path.resolve(__dirname, 'src/styles')
        },
      ],
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(), // Минифицирует CSS
      ],
    },
}