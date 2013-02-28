
var test = require('tape')
var Value = require('../')

test('set, get', function (t) {
  var v = new Value()
  v.set('hello')

  t.equal('hello', v.get())
  t.end()
})

test('history', function (t) {
  var v = new Value()
  v.histLength = 10
  v.set('hello')
  v.set(Math.random())
  v.set({thing: true})

  t.deepEqual({thing: true}, v.get())
  console.log(v.history())
  t.end()
})

