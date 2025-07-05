import userModel from "../models/userModel.js";


export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not Found!" });
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                isAccountVerified: user.isAccountVerified,
                createdWithGoogle: user.createdWithGoogle,
            }
        })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}