var Scuttlebutt = require('scuttlebutt')
var inherits    = require('util').inherits
var u           = require('scuttlebutt/util')

inherits(Value, Scuttlebutt)

//Constructor must call Scuttlebutt.call(this)
function Value (id, len) {
  if(!(this instanceof Value)) return new Value(id, len)
  Scuttlebutt.call(this, id)
  this._history = []
  this.histLength = len || 1
}

var V = Value.prototype

//each scuttlebutt subclass provides it's own functions
//to manipulate and retrive it's values.
//it should also emit events when it changes.

V.set = function (e) {
  this.localUpdate(e)
  return this
}

V.get = function () {
  this._history = this._history || []
  var l = this._history.length
  if(!l) return null
  return this._history[l - 1] && this._history[l - 1][0]
}

//each scuttlebutt subclass must override 
//applyUpdate and history

//applyUpdate takes a new update object,
//[value, ts, source_id]
//and puts it into the Scuttlebutt's history.
V.applyUpdate = function (update) {
  this._history = this._history || []
  this._history.push(update)
  u.sort(this._history)
  while(this._history.length > this.histLength)
    this.emit('_remove', this._history.shift())
  this.emit('update', update[0])
  return true
}

//history returns the updates since the sources.
//sources is a object of source_id: timestamp
//it should only return updates MORE RECENT
//for each source.

V.history = function (sources) {
  this._history = this._history || []
  var h = []
  this._history.forEach(function (e) {
    if(u.filter(e, sources))
      h.push(e)
  })
  return h
}

V.toJSON = function () {
  return this.get()
}

module.exports = Value
