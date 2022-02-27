

const express = require('express')
const path = require('path')
const app = express()


function sleep() {
    let start = Date.now()
    while(Date.now() - start < 3000) {

    }
}



app.use(function (req, res, next) {
    var filename = path.basename(req.url);
    var extension = path.extname(filename);
    console.log(extension)
    if (extension === '.jpg' || extension === '.js')
        sleep()
        console.log("The file " + filename + " was requested.");
    next();
});



app.use(express.static(path.join(__dirname, 'img')),()=>{
    console.log('111')
});



app.listen(8000,()=>{
    console.log('listening 8000......')
})

