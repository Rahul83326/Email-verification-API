const jwt = require("jsonwebtoken");

exports.signToken = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let access_token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
                expiresIn: `${process.env.JWT_EXPIRES_IN}`,
            });
            let refresh_token = jwt.sign({ _id: id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
                expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRE_IN}`,
            });
            resolve({ access_token, refresh_token })
        } catch {
            reject();
        }
    })
};

exports.getNewRefereshToken = async (accessToken) => {
    return new Promise(async (resolve, reject) => {
        if (await exports.verifyToken(accessToken, false)) {
            let newRefreshToken = jwt.sign({ _id: id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
                expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRE_IN}`,
            });
            resolve(newRefreshToken)
        } else {
            reject('invalid token')
        }
    });
}


exports.logout = async (refreshToken) => {
    try {
        return true;
    } catch (err) { return err }
}


exports.verifyToken = (token, isRefereshToken) => {
    new Promise(async (resolve, reject) => {
        let key = isRefereshToken ? process.env.JWT_REFRESH_TOKEN_SECRET : process.env.JWT_SECRET;
        jwt.verify(token, key, function (err, decoded) {
            if (decoded) { resolve(true) }
            else { resolve(false) }
        });
    });
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userData.role)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }
        next();
    };
};

//======= PROTECT =======
exports.protect = async (req, res, next) => {
    //1. getting token and check of its there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new AppError("you are not logged in", 401));
    }
    //2. verification token
    const decoded = await verifyToken(token);
    //3. check if user still exists
    const user = await User.findById(decoded._id);
    if (!user) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exists",
                401
            )
        );
    }
    req.userData = user;
    next();
}