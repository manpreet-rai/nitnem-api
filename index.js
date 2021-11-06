let express = require('express')
let cors = require('cors')
let app = express()

app.use(cors())
app.use(express.json())

app.get('/banis', function (req, res) {
    res.send(require('./list.json'))
})

app.get('/banis/:id', function (req, res) {
  if (req.params['id'] > 0 && req.params['id'] <= 104) {
      res.send(require(`./data/${req.params['id']}.json`))
  } else {
      res.json({ response: "invalid id"})
  }
})

app.listen(4000)