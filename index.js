const express = require('express');
const path=require('path')
const logger=require('./middleware/logger')
const membersRouter=require('./routers/api/members')
const exphbs= require('express-handlebars')
const members=require('./members')


const app= express();

//init midlleware
//app.use(logger)

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// render the handlebars view
app.get('/',(req,res)=>res.render('index',{
    title:'Member App',
    members
}))

//set a static folder
//app.use(express.static(path.join(__dirname,'public')))

//set the members router
app.use('/api/members',membersRouter)

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>console.log("runing on Port",PORT));
