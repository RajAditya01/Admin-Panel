// require("dotenv").config();

// const express = require("express");
// const app = express();
// const router = require("./routes/auth-router");
// const connectDb = require("./utils/db");
// const errorMiddleware = require("./middlewares/error-middleware");
// const contactRoute = require("./routes/contact-route");
// // Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
// app.use("/api/auth", router);

// const PORT = 5000;

// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`server is running at port: ${PORT}`);
//   });
// });

// app.all("*", (req, res) => {
//   res.send('Route Not Defined')
// })

// app.listen(PORT, () => {
//   console.log('Server Up')
// })



require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./routes/contact-router");

// to get the json data in express app.
app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});