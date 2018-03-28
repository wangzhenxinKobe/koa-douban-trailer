const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const yy = new EE()

yy.on('event', () => {
  console.log('yy了')
})

setTimeout(() => {
  console.log('0毫秒的定时器')
}, 0);
setTimeout(() => {
  console.log('100毫秒的定时器')
}, 100);
setTimeout(() => {
  console.log('200毫秒的定时器')
}, 200);

setImmediate(() => {
  console.log('setimmediate')
})

process.nextTick(() => {
  console.log('nextTick1')
})

Promise.resolve().then(() => {
  yy.emit('event')
  console.log('then1')
})