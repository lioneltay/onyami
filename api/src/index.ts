import express from "express"

import { applyGraphql } from "services/graphql"
const app = express()

applyGraphql(app)

app.get("/", async (req, res) => {
  res.send("Hello World!")
})

const PORT = 3030
app.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}.`)
})
