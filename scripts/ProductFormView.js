(function () {
   'use strict'
   var ProductFormView = (function () {
      function ProductFormView (json) {
         var form = document.createElement('form')

         Object.keys(json).forEach(fieldset_name => {
            var fieldset = document.createElement('fieldset')
            var legend = document.createElement('legend')
            var span = document.createElement('span')

            form.appendChild(fieldset)
            legend.textContent = fieldset_name
            fieldset.appendChild(legend)

            if (typeof json[fieldset_name] !== 'object') {
               span.innerText = json[fieldset_name]
            } else if (typeof json[fieldset_name] === 'object') {
               var input = document.createElement('input')
               input.id = fieldset_name
               fieldset.appendChild(input)
               span.innerText = `Accepts: ${Object.keys(json[fieldset_name]).join(', ')}`
            }

            fieldset.appendChild(span)
         })

         return form
      }
      return ProductFormView
   }())

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ProductFormView
  } else {
    window.ProductFormView = ProductFormView
  }
}())