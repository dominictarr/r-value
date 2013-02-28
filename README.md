# r-value

A single replicated value.

I wrote this module to be a scuttlebutt that fits well with
the typical document key-value store idea,

But it also works well as a demonstration of the simplest possible Scuttlebutt.

Or when you just need something really really simple that integrates with
[rumours](https://github.com/dominictarr/rumours)

## Example

```
var Value = require('r-value')

var v = Value()

v.set([anyObject])

v.get() //current value

v.on('update', function (value) {
  console.log('new value', value)
})
```

See [Scuttlebutt](https://github.com/dominictarr/scuttlebutt) for more documentation.

## License

MIT
