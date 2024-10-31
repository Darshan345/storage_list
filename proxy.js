import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Use CORS middleware
app.use(cors({
  origin: '*', // Adjust to specific domains in production for security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Frappe-API-Key', 'X-Frappe-API-Secret']
}));

app.options('*', (req, res) => {
  res.sendStatus(204);
});

// Proxy setup for API requests
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:8001',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  })
);

app.listen(PORT, () => {
  console.log(`CORS Proxy is running on http://localhost:${PORT}`);
});
