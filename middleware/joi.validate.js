class JoiValidation {
    validateData = (Schema) => (req, res, next) => {
        const data = req.body;
        const { error } = Schema.validate(data);
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ success: 0, msg: errorMessage });
        }
        req.input = data
        next();
    };

}
export default new JoiValidation()