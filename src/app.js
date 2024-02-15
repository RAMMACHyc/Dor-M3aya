import "./config"
import express from "express";
import routerUser from "./routes/userRoutes";
import routePlace from "./routes/placeRoutes"

const app = express();
const bodyParser = require('body-parser');
 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json())
app.use("/user", routerUser)
app.use("/place",routePlace)

export default app;


 
