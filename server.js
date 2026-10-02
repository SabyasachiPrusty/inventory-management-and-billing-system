const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))


app.use("/api/auth", require("./routes/auth"))
app.use("/api/products", require("./routes/products"))
app.use("/api/customers", require("./routes/customers"))
app.use("/api/sales", require("./routes/sales"))
app.use("/api/billing", require("./routes/billing"))
app.use("/api/invoice", require("./routes/invoice"))

app.listen(3000,()=>{
console.log("Server running on port 3000")
})