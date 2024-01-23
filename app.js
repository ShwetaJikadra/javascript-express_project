require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT;
const multer=require('multer');
const bodyParser = require('body-parser');
const path=require('path');
const imagepath=path.join(__dirname,'public','images');
const morgan = require('morgan');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public/images',express.static(imagepath));


const user=require('./routes/user/index.routes');
const admin=require('./routes/admin/index.routes');





async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log(process.env.MONGO_DB_URL)
}
main()
  .then(() => console.log("db is connected"))
  .catch((error) => console.log("internal server error"));

app.use("/api",user);
app.use("/api/admin", admin);



app.listen(port, () => {
  console.log(`you connected at port ${port}`);
});
