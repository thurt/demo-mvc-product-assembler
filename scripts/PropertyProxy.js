(function () {
  'use strict'
  var PropertyProxy = (function () {
    var PropertyProxy = function (props) {
      var _this = {},
        instance = Object.create(PropertyProxy.prototype),
        createProperty = {
          static: function (key) {
            _this[key] = props[key]
            Object.defineProperty(instance, key, {
              get: function () {
                return _this[key]
              },
              enumerable: true
            })
          },
          dynamic: function (key) {
            Object.defineProperty(instance, key, {
              get: function () {
                return _this[key]
              },
              set: function (option) {
                if (option in props[key] || option === null) {
                  _this[key] = option
                  return true
                }
                else {
                  return false
                }
              },
              enumerable: true
            })
          }
        }
      Object.keys(props).forEach(function (key) {
        _this[key] = null // starting value for each property
        if (typeof props[key] !== 'object') createProperty.static(key)
        else createProperty.dynamic(key)
      })

      Object.defineProperty(instance, 'getValue', {
        value: function (option) {
          if (_this[option] !== 'undefined' && _this[option] !== null && typeof props[option] === 'object') {
            return props[option][_this[option]]
          }
          else {
            return false
          }
        },
        enumerable: false
      })

      return instance
    }

    PropertyProxy.prototype = {
      getBuild: function () {
        return Object.assign({}, this)
      },
      loadBuild: function (build_obj) {
        var prop, props = this.getProperties()
        for (prop in build_obj) {
          if (!props[prop]) {
            throw new Error(`Cannot load build object. It contains an invalid property [${prop}]`)
          }
          if (props[prop].every(function (val) {
              return val !== build_obj[prop]
            })) {
            throw new Error(`Cannot load build object. It contains a property [${prop}] with an invalid option [${build_obj[prop]}]`)
          }
        }
        Object.assign(this, build_obj)
      },
      resetBuild: function () {
        Object.keys(this).forEach(function (prop) {
          this[prop] = null
        })
      }
    }

    return PropertyProxy
  }())

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = PropertyProxy
  }
  else {
    window.PropertyProxy = PropertyProxy
  }
}())
