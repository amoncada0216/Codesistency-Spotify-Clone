import {User} from "../models/userModel.js"

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // Check if user already exists 
        const user = await UserActivation.findOne({ clerkId });

        if (!user) {
            // Signup
            await UserActivation.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })

        }

        req.statusCode(200).json({ success: true });

    } catch (error) {
        console.log("Error in auth callback.", error);
        next(error)
    }
}

