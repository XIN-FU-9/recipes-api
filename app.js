//Part 1: Build the Full CRUD API
const express = require("express");
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const PORT = 8080;
// class note:
const apiRouter = require('./api');

// This need to be at the begainning mandantray.
app.use(express.json()) // why move to to above app.use(myMiddleware), cz we need req.body, this allowed express.json() excess first.

// class note
app.use('/api', apiRouter) // this conneted to api folder that connetes to only index file, index file includes other two routes (reviews and recepies)
// class note end



//Part 2 Register A middleware
// example:

// since in part 7, so we need to delete this 
// function myMiddleware(req, res, next){
//     console.log(`This is a request for middleware,${req.method} , ${req.originalUrl}`)
//     next();
// }
// app.use(myMiddleware)

//end part 2


//part 7 clss note:
app.use(morgan('dev'))

//class note part 8
// app.use(cors({
//     origin:('http://localhost')
// }))
// or this way , this is the second way.
app.use(cors())

// class note end
// question: what is the header's(request header)--mdn website



function errorHandler(err, req, res, next) { 

  console.error(">>>>>>>>", err.message);
  res.sendStatus(500); 
}


// 4.2:register the error handler
app.use(errorHandler) 
// end the part 4.2

//This is the part of the firt step for set up. need code this at the end.
app.listen(PORT, () => {
    console.log('It is a working page.')
})
// app.listen(8080,() => console.log ("It is a working page."))