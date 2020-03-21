const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/__', {target: 'http://localhost:4000/'}));
    app.use(createProxyMiddleware('/functions', {target: 'http://localhost:4000/'}))
};
