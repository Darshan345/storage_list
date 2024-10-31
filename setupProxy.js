const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This should match the beginning of the API route in your requests
    createProxyMiddleware({
      target: 'http://127.0.0.1:8001', // Your Frappe server URL
      changeOrigin: true,
    })
  );
};
