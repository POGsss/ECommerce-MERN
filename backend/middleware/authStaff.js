import jwt from "jsonwebtoken";

const authStaff = async (req, res, next) => {
    try {
        // Getting User Input
        const { token } = req.headers;

        // Validating Token
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        // Decoding Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken !== process.env.STAFF_EMAIL + process.env.STAFF_PASSWORD) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // Calling Callback Function
        next();
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authStaff;