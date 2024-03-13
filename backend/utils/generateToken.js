import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d' //15 days
    })

    res.cookie("jwt", token, {//jwt is the name of cookie, it could be anything
        maxAge: 15*24*60*60*1000, //15days in milliseconds
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",//https
    });
};
export default generateTokenAndSetCookie;