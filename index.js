var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var server = express()

server.use(logger('dev')) //log all requests in terminal
server.use(bodyParser.json()) //get access to all POST requests, attaches all user input to request.body
server.use(bodyParser.urlencoded({extended:false})) //

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
    //response.send('<h1>What up World!</h1>')
    response.render('home.ejs')
})

server.get('/about-me', function(request, response){
    response.render('about.ejs')
})

server.get('/portfolio', function(request, response){
    response.render('portfolio.ejs')
})

server.get('/contact', function(request, response){
    response.render('contact.ejs')
})

server.post('/', function(request, response){
    
    console.log(request.body)
    //take the strong of names and split it into an array
    var names = request.body.people.split(',')
    //create a loop that randomly picks two pairs and puts them into an array
    //add that group to a bigger array
    //when all the people are used up we stop the loop
    var groups = [ ]
    var currentGroup = [ ]
    while(names.length > 0){
        var randomNumber= Math.floor(Math.random()*names.length)
        var person = names[randomNumber]
        currentGroup.push(person)
        names.splice(randomNumber, 1)
        
        if(currentGroup.length >= 2){
            groups.push(currentGroup)
            currentGroup= [ ]
        }
        
        
    }
    console.log(groups)
    response.render('results.ejs', {data: groups})
})



var port = process.env.PORT

server.listen(port, () => {
    console.log('Server listening on port' + port)
})

