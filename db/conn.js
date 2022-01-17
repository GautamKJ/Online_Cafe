const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/customerDetail", {

}).then(() => {
    console.log("connection is done...");
}).catch((err) => {
    console.log(err);
});
