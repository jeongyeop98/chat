var app = require("express")()
var http = require("http").Server(app)
var io = require("socket.io")(http)

app.get("/", function(req, res) {
    res.sendfile("index.html")
})

io.on("connection", function(socket) {
    console.log("a user connected", socket.id)

    socket.on("disconnect", function() {
        console.log("user disconnected", socket.id)
    })

    socket.on('client message', function(msg) {
        console.log('message:' + msg)
        io.emit('server message', msg)
    })
})

http.listen(1111, function() {
    console.log("server on")
})