import "./config"
import express from "express";
import routerUser from "./routes/userRoutes";
import routePlace from "./routes/placeRoutes"
import routecategory from "./routes/categoryRoutes"
import routePost from "./routes/postRoutes"
import { uploadHandler } from "./middleware/upload";
import uploadMiddleware from "./util/upload";

const app = express();
const bodyParser = require('body-parser');
 
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use("/user", routerUser)
app.use("/place",routePlace)
app.use("/category",routecategory)
app.use("/posts",routePost)


app.post('/upload',uploadMiddleware.single("image"), uploadHandler);

export default app;


 
