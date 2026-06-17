import { User } from "../models/user.modal.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (userExists) {
      throw new ApiError(409, "User already exists", "USER_ALREADY_EXISTS");
    }

    let localAvatarFile = req.file?.path;

    if (!localAvatarFile) {
      throw new ApiError(400, "Avatar is required from local file system");
    }
    let avatar = await uploadOnCloudinary(localAvatarFile);
    const user = await User.create({
      username,
      email,
      password,
      avatar: avatar?.url,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while creating user");
    }

    res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User created successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser };
