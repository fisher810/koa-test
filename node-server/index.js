const koa = require('koa')
const koaRouter = require('koa-router')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const app = new koa()
const router = new koaRouter()

// 指定静态资源
app.use(static(
  path.join( __dirname,  '/views')
))
app.use( async (ctx, next) => {
  console.log(ctx.url)
  if (ctx.url === '/prodURL/login') {
    ctx.body = {status: 0, msg: '成功'}
  }
  next()
})
// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())
router.get('/', (ctx) => {
  ctx.body = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
})
router.get('/login', (ctx) => {
  ctx.body = fs.readFileSync(__dirname + '/views/login.html', 'utf-8')
})
// router.post('/prodURL/login', async (ctx, next) => {
//   ctx.body = {status: 0, msg: '成功'}
//   next()
// })




app.listen(3000)