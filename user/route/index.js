import { Router } from "express"
import { userController } from "../Controller/index.js";
import joiValidate from "../../middleware/joi.validate.js";
import userSchema from "../service/validation.Schema.js";
import JWTHelper from "../../utils/jwt.token.helper.js"
const router = Router();
router.post('/register', joiValidate.validateData(userSchema.register), userController.userRegister)
router.post('/login', joiValidate.validateData(userSchema.login), userController.login)
router.post('/business-register', JWTHelper.JwtParser, joiValidate.validateData(userSchema.businessRegister), userController.businessRegister)
router.post('/verify-user', JWTHelper.JwtParser, joiValidate.validateData(userSchema.Otp), userController.verifyUser)
router.get('/user', async (req, res) => {
 res.status(200).json({
     success: true,
     data: "severless worked properly"
 })
})

export default router