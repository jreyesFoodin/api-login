const bcrypt = require('bcrypt-nodejs')

module.exports = {
  create (password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(5, function (error, salt) {
        if (error) return reject(error)
        bcrypt.hash(password, salt, null, function (error, hash) {
          if (error) return reject(error)
          resolve(hash)
        })
      })
    })
  },

  verify (hash, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (error, isMatch) {
        if (error) return reject(error)
        resolve(isMatch)
      })
    })
  }
}
