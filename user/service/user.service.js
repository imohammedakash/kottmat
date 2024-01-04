import bcrypt from 'bcrypt'
import { executionScript } from "../../config/db.js";
import commonHelper from "../../utils/common.helper.js";
class UserService {

    register = async (res, data) => {
        let ColumnArr = Object.keys(data).filter(key => key !== 'ID');
        let currentDate = new Date().toISOString().slice(0, 19) + 'Z';
        let values = Array.from({ length: ColumnArr.length }, (_, index) => `$${index + 1}`).join(', ');
        let paramValue = ColumnArr.map(i => data[i])
        let qry = `INSERT INTO users (id, ${ColumnArr.join(',')} , createdon) 
        VALUES ('${data.ID}',  ${values}  , '${currentDate}') RETURNING *;`;
        try {
            const [user] = await executionScript.paramQry(qry, paramValue)
            return { user }
        } catch (error) {
            throw commonHelper.customError("Something Went Wrong", 500)
        }
    }

    getExistingUser = async (data) => {
        if (!data) return false;
        let [key] = Object.keys(data);
        try {
            let qry = `select * from users where ${key} = $1`;
            let [user] = await executionScript.paramQry(qry, [data[key]]);
            return { ...user };
        } catch (error) {
            return error
        }

    }
    hashPassword = async (password) => {
        try {
            const saltRounds = process.env.SALT_ROUNDS || 10;
            const salt = await bcrypt.genSalt(parseInt(saltRounds));
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            console.log(error.message);
            throw commonHelper.customError("Something Went Wrong", 500)
        }
    }
    comparePassword = async (enteredPassword, hashedPassword) => {
        try {
            const match = await bcrypt.compare(enteredPassword, hashedPassword);
            return match;
        } catch (error) {
            throw new Error('Error comparing passwords');
        }
    }



}

export default new UserService()