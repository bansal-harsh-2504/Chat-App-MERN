import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        let loggedInUserId = req.user._id;
        let filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); //all users that are ne(not equal to) the loggedInuser

        res.status(200).json(filteredUsers);

    } catch(err){
        console.log("Error in getUsersForSidebar controller", err.message);
        res.status(500).json({error: "Internal Server Error"} );
    }
};