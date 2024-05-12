/* imports */
const fs = require("node:fs");
let express = require('express')
let cors = require('cors')
let app = express()


/* variables */
const port = process.env.PORT || 4000
const data = JSON.parse(fs.readFileSync('banis_.json'))


/* middlewares */
app.use(cors())
app.use(express.json())


/* routes */
app.get('/', (req, res) => {
  res.redirect('/banis');
})

app.get('/banis', function (req, res) {
  res.send(require('./list.json'))
})

app.get('/banis/:id', function (req, res) {
  if (req.params.id < 1 || req.params.id > 104) {
    res.json({ response: "request invalid"})
    return
  }
  res.send(require(`./data/${req.params['id']}.json`))
})

app.get('/banis/:id/merged', function (req, res) {
  if (req.params.id < 1 || req.params.id > 104) {
    res.json({ response: "request invalid"})
    return
  }
  res.send(data.filter((datum) => datum.baniID === parseInt(req.params.id)));
});


/* start */
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
