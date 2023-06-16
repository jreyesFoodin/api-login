const nodemailer = require('nodemailer')
const { userLogin } = require('../constants/mails/userLogin')
// Email Auth doctor
exports.sendDoctorEmail = async function (req, res) {
  let templateEmail = userLogin({
    nombre: req.name
  })
  // Definimos el transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
  // Definimos el email
  var mailOptions = {
    from: `Promedica <${process.env.EMAIL}>`,
    to: req.email,
    subject: `Tu cuenta fue creada`,
    text: templateEmail,
    html: templateEmail
  }
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.send(500, error.message)
    } else {
      // console.log('Email sent')
      res.status(200).jsonp(req.body)
    }
  })
}
