const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../devMockup/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/', async function (req, res, next) {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    const user = User.filter((obj) => obj.email === email)[0]

    const unauthorized = {
      error: {
        errors: [
          {
            domain: 'global',
            reason: 'required',
            message: 'Login Required',
            locationType: 'header',
            location: 'Authorization',
          },
        ],
        code: 401,
        message: 'Login Required',
      },
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '10m',
        }
      )
      user.token = token
      res.status(200).json(token)
    } else {
      res.status(401).json(JSON.stringify(unauthorized))
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
