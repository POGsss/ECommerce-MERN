import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        // Getting User Input
        const { token } = req.headers;

        // Validating Token
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        // Decoding Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;

        // Calling Callback Function
        next();
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;