
const mongoose = require("mongoose");
exports.connectDB = () =>{
    mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database connected');
})
}