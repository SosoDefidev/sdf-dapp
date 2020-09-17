import { createProxyMiddleware } from 'http-proxy-middleware'

export const config = {
  api: {
    bodyParser: false
  }
}

export default createProxyMiddleware({
  target: '',
  changeOrigin: true,
  pathRewrite: {
    '/api': ''
  },
  logLevel: process.env.NODE_ENV === 'production' ? 'silent' : 'debug'
})
