class CommonHelper {
    sendError = (res, successStatus, statusCode, message, data = []) => {
        res.status(statusCode).json({
            success: successStatus,
            statusCode,
            // message: typeof message === "string" ? res.__(message) : res.__(message.key, message.value),
            message,
            data
        });
    }
    sendSuccess = (res, successStatus, statusCode, message = null, data) => {
        res.status(statusCode).json({
            success: successStatus,
            statusCode,
            data,
            message
        });
    }
    customError = (message, statusCode) => {
        let error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }
    generateOTP = () => {
        let digits = process.env.OTP_SIZE;
        if (digits <= 0 || digits > 8) {
            throw new Error('Invalid number of digits.');
        }
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomCode.toString();
    }


}

export default new CommonHelper()