const express = require('express')
const router = express.Router()
const User = require('../../devMockup/users')

router.post('/', async function (req, res, next) {
  try {
    const { email } = req.body
    if (!email) {
      res.status(400).send('All input is required')
    }
    const user = User.filter((obj) => obj.email === email)[0]
    if (user) {
      res.status(200).send(true)
    } else {
      res.status(400).send(false)
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
