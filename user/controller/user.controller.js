
import { v4 as uuidv4 } from 'uuid';
import userService from '../service/user.service.js';
import commonHelper from '../../utils/common.helper.js';
import jwtTokenHelper from '../../utils/jwt.token.helper.js';
import verificationHelper from '../../utils/verification.helper.js';
import Template from '../../Template/index.js';
import { executionScript } from '../../config/db.js';


class UserController {

    userRegister = async (req, res) => {
        try {
            let userID = uuidv4();
            let input = req.input;
            let existing = await userService.getExistingUser({ email: input?.email });
            if (existing?.email) throw commonHelper.customError("User Already Exists on this email", 409);
            let hashedPassword = await userService.hashPassword(input.password)
            let { user } = await userService.register(res, { ...input, ID: userID, password: hashedPassword });
            if (!user) {
                throw commonHelper.customError("Something Went Wrong", 500)
            }
            let token = await jwtTokenHelper.generateToken(userID);
            let otp = commonHelper.generateOTP();
            await verificationHelper.sendMail(user.email, Template.EMAIL_SUBJECT(), Template.VERIFY_MAIL_BODY({ ...user, otp }));
            await executionScript.paramQry(`update users set otp = '${otp}' where id = '${user.id}'`)
            commonHelper.sendSuccess(res, true, 200, "OTP has been sent, please verify", token)
        } catch (e) {
            commonHelper.sendError(res, false, e.statusCode, e.message);
        }
    }
    login = async (req, res) => {
        try {
            let input = req.input;
            console.log(input);
            let existing = await userService.getExistingUser({ email: input?.email });
            console.log(existing);
            if (!existing?.email) throw commonHelper.customError("Invalid UserName or Password", 409);
            if (!userService.comparePassword(input.password, existing.password)) throw commonHelper.customError("Invalid UserName or Password", 409);
            let token = await jwtTokenHelper.generateToken(existing.id);
            commonHelper.sendSuccess(res, true, 200, "LoggedIn Succesfylly", token);
        } catch (e) {
            commonHelper.sendError(res, false, e.statusCode, e.message);
        }
    }
    verifyUser = async (req, res) => {
        let user = req.user;
        let otp = req.body.otp;
        if (user.verified) {
            throw commonHelper.customError("User Already Verified", 200);
        }
        if (!user || !otp) {
            throw commonHelper.customError("UnAuthorized Access", 500);
        }
        try {
            if (parseInt(user.otp) !== parseInt(otp)) throw commonHelper.customError("Invalid OTP", 401);
            await executionScript.paramQry(`update users set verified = true, otp=null where id = '${user.id}'`);
            commonHelper.sendSuccess(res, true, 200, "User Verified Successfully");
        } catch (e) {
            commonHelper.sendError(res, false, e.statusCode, e.message);
        }
    }
    businessRegister = async (req, res, next) => {
        try {
            let userID = uuidv4();
            let input = req.input;
            let existing = await userService.getExistingUser({ email: input?.email });
            if (existing?.email) throw commonHelper.customError("User Already Exists on this email", 409);
            let hashedPassword = await userService.hashPassword(input.password)
            let { user } = await userService.register(res, { ...input, ID: userID, password: hashedPassword });
            if (!user) {
                throw commonHelper.customError("Something Went Wrong", 500)
            }
            let token = await jwtTokenHelper.generateToken(userID);
            let otp = commonHelper.generateOTP();
            await verificationHelper.sendMail(user.email, Template.EMAIL_SUBJECT(), Template.VERIFY_MAIL_BODY({ ...user, otp }));
            await executionScript.paramQry(`update users set otp = '${otp}' where id = '${user.id}'`)
            commonHelper.sendSuccess(res, true, 200, "OTP has been sent, please verify", token)
        } catch (e) {
            commonHelper.sendError(res, false, e.statusCode, e.message);
        }
    }

}


export default new UserController()