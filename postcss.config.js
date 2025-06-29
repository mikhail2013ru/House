module.exports = {
    plugins: [
        require('autoprefixer')({
        overrideBrowserslist: 'last 2 versions' // или ваш кастомный список
        })
    ]
}