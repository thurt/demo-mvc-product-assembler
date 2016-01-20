(function () {
  'use strict'
  var ProductClass = (function () {
    function ProductClass(obj) {
      Object.defineProperties(obj, ProductClass.properties)
      return obj
    }
    ProductClass.properties = {
      price: {
        get: function () {
          var o = this
          var sum = this['Base Price']
          sum += Object.keys(o).reduce(function (sum, part) {
            var val = o.getValue(part)
            console.log(part, val)
            if (val !== null) {
              return sum + val
            }
            else {
              return sum
            }
          }, 0)
          return sum
        },
        enumerable: false,
        configurable: true
      },
      isAssembled: {
        get: function () {
          var o = this
          return Object.keys(o).every(function (part) {
              return o[part] !== null
            })
        },
        enumerable: false,
        configurable: true
      },
      missingParts: {
        get: function () {
          var o = this
          return Object.keys(o).filter(function (part) {
            return o[part] === null
          })
        },
        enumerable: false,
        configurable: true
      }
    }

    return ProductClass
  }())

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ProductClass
  }
  else {
    window.ProductClass = ProductClass
  }
}())
