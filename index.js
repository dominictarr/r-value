var Scuttlebutt = require('scuttlebutt')
var inherits    = require('util').inherits
var u           = require('scuttlebutt/util')

inherits(Value, Scuttlebutt)

function Value (id, len) {
  if(!(this instanceof Value)) return new Value(id, len)
  Scuttlebutt.call(this, id)
  this._history = []
  this.histLength = 1
}

var V = Value.prototype

V.set = function (e) {
  this.localUpdate(e)
  return this
}

V.get = function () {
  var l = this._history.length
  if(!l) return null
  return this._history[l - 1] && this._history[l - 1][0]
}

V.applyUpdate = function (update) {
  this._history.push(update)
  u.sort(this._history)
  while(this._history.length > this.histLength)
    this.emit('_remove', this._history.pop())
  this.emit('update', update[0])
  return true
}

V.history = function (sources) {
  var h = []
  this._history.forEach(function (e) {
    if(u.filter(e, sources))
      h.push(e)
  })
  return h
}

module.exports = Value
