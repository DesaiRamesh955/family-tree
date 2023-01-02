const express = require("express");
const dotenv = require("dotenv");
const path = require("path")
const cors = require("cors")
const os = require( 'os' )
const {connectDB} = require("./config/db")
const cluster = require("cluster")
const app = express();

const cCPUs   = os.cpus().length;
dotenv.config() 


if( cluster.isPrimary ) {
  for( let i = 0; i < cCPUs; i++ ) {
    cluster.fork();
  }

  cluster.on( 'exit', function(  ) {
    cluster.fork();
  });
}
else{
  connectDB()
//middleware for parse formdata in json
app.use(cors())
app.use(express.json())
app.use("/public",express.static(path.join(__dirname,'/public')))

app.use("/api", require("./routes/family"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
}

