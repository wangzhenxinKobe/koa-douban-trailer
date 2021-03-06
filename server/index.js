const Koa = require('koa')
const views = require('koa-views')

const { resolve } = require('path')
const { connect } = require('./database/index')
;(async () => {
  await connect()
})()
const app = new Koa()
app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))
app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'xxx',
    me: 'aaa'
  })
})

app.listen(4455)