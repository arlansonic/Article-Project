 module.exports = app => {
     function existsOrError(value, msg) {
         if (!value) throw msg
         if (Array.isArray(value) && value.length === 0) throw msg
         if (typeof value === 'string' && !value.trim()) throw msg
     }

     function notExists0Error(value, msg) {
         try {
             existsOrError(value, msg)
         } catch (msg) {
             return
         }
         throw msg
     }

     function equals0Error(valueA, valueB, msg) {
         if (valueA !== valueB) throw msg
     }

     return { existsOrError, notExists0Error, equals0Error }
 }