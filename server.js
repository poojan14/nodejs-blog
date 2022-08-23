const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const connectDB = require('./config/db')

// Load config
//dotenv.config({ path: './config/config.env' })

const app = express()

connectDB()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

//bcoz push to heroku
app.set('trust proxy', 1);

app.use('/articles', articleRouter)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

