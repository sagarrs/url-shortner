var express = require('express');
var app = express();
var useragent = require('express-useragent');
const port = 3000
 
app.use(useragent.express());
app.get('/', function(req, res){
    res.send(req.useragent);
});

app.listen(port, function(){
    console.log(`listening on port ${port}`)
})

