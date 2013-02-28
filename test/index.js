
var test = require('tape')
var Value = require('../')

test('set, get', function (t) {
  var v = new Value()
  v.set('hello')

  t.equal('hello', v.get())
  t.end()
})

test('history', function (t) {
  var v = new Value(), updates = [], r
  v.histLength = 10

  v.on('update', updates.push.bind(updates))

  v.set('hello')
  v.set(r = Math.random())
  v.set({thing: true})

  t.deepEqual({thing: true}, v.get())
  t.deepEqual(updates, [
    'hello',
    r,
    {thing: true}
  ])

  console.log(v.history())
  t.end()
})

