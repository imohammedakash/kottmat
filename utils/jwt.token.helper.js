import Jwt from "jsonwebtoken";
import commonHelper from "./common.helper.js";
import { executionScript } from "../config/db.js";
class JWTHelper {

    generateToken = async (userID) => {
        let expiresDays = process.env.JWT_EXPIRE || 7;
        let JWT_SECRET = process.env.JWT_SECRET
        const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * expiresDays;
        let token = Jwt.sign({ userID }, JWT_SECRET, { expiresIn })
        return { token }
    };
    JwtParser = (req, res, next) => {
        const authHeader = req?.headers?.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return commonHelper.sendError(res, false, 401, "Authorization failed");
        }
        const token = authHeader.substring(7);
        let JWT_SECRET = process.env.JWT_SECRET;
        Jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return commonHelper.sendError(res, false, 401, "Authorization failed");
            }
            executionScript.paramQry(`select * from users where id=$1`, [decoded.userID]).then(res => {
                req.user = res[0];
                next();
            }).catch(() => {
                return commonHelper.sendError(res, false, 500, "UnAuthorized Access");
            })
        });
    }

}
export default new JWTHelper()