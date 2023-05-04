const express = require ("express")
const app = express()
const cors = require ("cors")
const mongoose = require ("mongoose")

app.use (cors())
app.use (express.json())

const dataBaseKey = "mongodb+srv://JurgitaEz:Austeja1982@jurgitaez.lecfkfj.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dataBaseKey)
    .then(() => {
        console.log("Connect OK")
    }).catch(e => {
    console.log(e)
})

const userSchema = require("./schema/userSchema")

app.post ("/createUser", (req, res) =>{
    const myData = req.body
    console.log(myData)

    const newUser = new userSchema(myData)
    newUser.save().then(() => {
        userSchema.find().then (users =>{
            res.send ({users})
        })
    })
})

app.get("/allUsers", (req, res) => {
    userSchema.find().then (data => {
        console.log(data)
        res.send({data})
    })
})

app.get("/singleUser/:id", (req, res) => {
    const id = req.params.id
    userSchema.findOne({_id:id}).then (data => {
        console.log(data)
        res.send({data})
    })
})

app.post("/update/:id", (req, res) => {
    const {id, image} = req.body

    userSchema.findOneAndUpdate(
        {_id: id},
        {$set: {image: image}},
        {new: true},
    ).then(data => {
        res.send({ok: "update successful"})
    })
})

app.get("/delete/:id", (req, res) => {
    const id = req.params.id
    userSchema.findOneAndDelete({_id:id}).then (data => {
            console.log(data)

            res.send({ok: "user is deleted"})
        })
})

app.post("/search", (req, res) => {
    const {title} = req.body

    userSchema.find({title: {"$regex":title, "$options": "i"}}).then(data => {
        console.log(data)
        res.send({data})
    })
})

app.listen(4000)