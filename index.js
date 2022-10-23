//import express
const { response } = require("express")
let express = require("express")
let mongoose = require('mongoose')
const videos = require("./videos")
let cors = require("cors")

//create express app
let app = express()
//configure this app to work with request and response 
//in JSON format
app.use(express.json())
//configure cors
app.use(cors())

//connect with mongodb
let connectionString = "mongodb+srv://first:already@cluster0.cvnwoyt.mongodb.net/youtube"
mongoose.connect(connectionString)
let db = mongoose.connection

//check if mongodb conenction was success
db.once("open", ()=>{
    console.log("Mongodb database hosted on cloud.mongodb.com is connected!")
})

//use express app to create first endpoint to 
//receive GET request

//whenever the GET request comes from / 'root' endpoint, execute
//the associated callback function
app.get("/", (request, response) => {
    console.log("GET Request received....")
    response.json({
        "message": "Welcome to youtube API",
        "request_type": "GET"
    })
})

//whenever the POST request comes from / 'root' endpoint, execute
//the associated callback function
app.post("/", (request, response) => {
    console.log("POST Request received....")
    response.json({
        "message": "Welcome to youtube API",
        "request_type": "POST"
    })
})

app.get("/video/all", (request, response) => {
    console.log("Get the list of all videos...")
    //get all the documents
    videos.find({},(error, data)=>{
        if(error){
            response.json(error)
        }else{
            response.json(data)
        }
    })
})

app.post("/video/add", (request, response)=>{
    //log the request body in the console
    console.log("Log request body received in console")
    console.log(request.body)
    //create new instance of video (empty document)
    let newvideo = new videos()
    //extract values from request body and initialize each in
    //newvideo
    console.log(newvideo)
    newvideo.title = request.body.title
    newvideo.videoid = request.body.videoid
    newvideo.likes = request.body.likes
    newvideo.dislikes = request.body.dislikes
    console.log(newvideo)
    //save newvideo to mongodb
    newvideo.save((error, data)=>{
        if(error){
            response.json(error)
        }else{
            response.json(data)
        }
    })

})


//expose the express app on port 8888
let PORT = 8888
//listed to port 8888 and if it is successfull, then execute
//the callback function
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})