const knex = require('../db/knex')
const errors = require('../constants/errors')
const messages = require('../constants/messages')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

async function validateEmail (email) {
  return knex.first('email')
    .from('user_login')
    .whereRaw(`LOWER(email) = '${email}'`)
}
module.exports = {
  async signup (body) {
    const cleanEmail = body.email ? body.email.trim().toLowerCase() : undefined
    const cleanName = body.name ? body.name.trim() : undefined
    const cleanLastName = body.lastName ? body.lastName.trim() : ''
    const cleanSecondLastName = body.secondLastName ? body.secondLastName.trim() : ''
    const name = cleanName.toUpperCase()

    const existEmail = await validateEmail(cleanEmail)
    if (existEmail) throw new Error(errors.AUTH.EMAIL_EXIST)
    const passwordGenerate = await bcrypt.create(body.password)
    if (!cleanEmail || !cleanName) throw new Error(errors.AUTH.incomplete_data_user_create)
    if (!passwordGenerate) throw new Error(errors.AUTH.PASSWORD_NOT_FOUND)
    try {
      const [ id ] = await knex('user_login')
        .returning('id')
        .insert({
          email: cleanEmail,
          password: passwordGenerate,
          name: name,
          lastName: cleanLastName,
          secondLastName: cleanSecondLastName,
          phone: body.phone
        })
      if (!id) throw new Error(errors.AUTH.USER_NOT_CREATED)
      return {
        message: messages.USER_CREATED
      }
    } catch (error) {
      console.log(error)
      throw new Error(errors.AUTH.USER_NOT_CREATED)
    }
  },
  async signIn ({ email = '', password = '' }) {
    let cleanUser = email.trim().toLowerCase()
    if (!email || !password) throw new Error(errors.AUTH.ENTER_YOUT_ACCESSES)
    let usuario = await knex.first([
      'email',
      'password',
      'name',
      'id',
      'active'
    ])
      .from('user_login')
      .where('email', cleanUser)
    if (!usuario) throw new Error(errors.AUTH.INCORRECT_ACCESS)
    if (!usuario.active) throw new Error(errors.AUTH.SUSPENDED_ACCOUNT)
    let verified = await bcrypt.verify(usuario.password, password)
    if (!verified) throw new Error(errors.AUTH.INCORRECT_ACCESS)

    let token = await jwt.create({ id: usuario.id })

    return {
      token
    }
  },
  async validateSession (userToken) {
    try {
      let user = await knex.first([
        'user_login.email',
        'user_login.active',
        'user_login.password',
        'user_login.id',
        'user_login.name',
        'user_login.lastName',
        'user_login.secondLastName',
        'user_login.phone'
      ])
        .from('user_doctor')
        .where('user_doctor.id', userToken.id)

      return {
        data: {
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          secondLastName: user.secondLastName,
          phone: user.phone
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
