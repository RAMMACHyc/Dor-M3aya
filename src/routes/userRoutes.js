
import { Router} from "express";
import  {registerUser, loginUser}  from "../controllers/userController";

const routerUser = Router();
routerUser.post('/signup', registerUser)
routerUser.post('/signin', loginUser)
export default routerUser;


 
