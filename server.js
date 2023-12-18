require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./routes/auth-router");
const connectDb = require("./utils/db");

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

// app.all("*", (req, res) => {
//   res.send('Route Not Defined')
// })

// app.listen(PORT, () => {
//   console.log('Server Up')
// })