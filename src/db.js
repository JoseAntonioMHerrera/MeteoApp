var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/meteoDB',{ useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false });

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){

});

module.exports={
    mongoose_db: db
}
