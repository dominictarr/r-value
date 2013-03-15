
var test = require('tape')
var Value = require('../')

test('set, get', function (t) {
  var v = new Value()
  v.set('hello')

  t.equal('hello', v.get())
  t.equal('hello', v.toJSON())
  t.end()
})

test('history', function (t) {
  var v = new Value(), updates = [], r
  v.histLength = 10

  v.on('update', updates.push.bind(updates))

  v.set('hello')
  t.equal('hello', v.toJSON())
  t.equal('hello', v.get())
  v.set(r = Math.random())
  t.equal(r, v.toJSON())
  t.equal(r, v.get())
  v.set({thing: true})
  t.deepEqual({thing: true}, v.toJSON())
  t.deepEqual({thing: true}, v.get())

  t.deepEqual({thing: true}, v.get())
  t.deepEqual(updates, [
    'hello',
    r,
    {thing: true}
  ])

  console.log(v.history())
  t.end()
})

test('replicate', function (t) {

  var v = new Value()
  var w = new Value()

  var vs = v.createStream()

  vs.pipe(w.createStream()).pipe(vs).resume()
  vs.resume()

  v.set({hello: true})

  t.deepEqual(v.get(), w.get())
  t.end()

})

test('null toJSON', function (t) {

 var v = new Value()
  v.set({thing: true})

  t.deepEqual(v.get(), {thing: true})
  v.set(null)
  console.log(v.history())
  t.deepEqual(v.get(), null)
  t.end()
})
