'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/index')
})
router.get('/calculadora', (req, res, next) => {
  res.render('pages/calculadora')
})
router.get('/post-it', (req, res, next) => {
  res.render('pages/post-it')
})
module.exports = router