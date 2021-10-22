const User = require("./user.model");

exports.createUser = (user) => {
    return User.create(user);
}

exports.findUserByIdAndUpdate = async (userId, user) => {
    await User.findByIdAndUpdate(userId, user, {
        new: true,
        runValidators: true,
    });
}

exports.getUser = async (userId) => {
    return await User.findById(userId);
}

exports.deleteUserById = async (userId) => {
    return await User.findByIdAndDelete(userId);
}


exports.getAllUsers = async () => {
    return await User.find();
}

exports.compareUserPasswordByName = async (username, password) => {
    const user = await User.findOne({ name: username }).select("+password");
    if (await user.comparePassword(password, user.password)) {
        return user._id;
    } else {
        return false;
    }
}

