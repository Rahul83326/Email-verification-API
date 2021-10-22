const userService = require("../user/user.service");
const authenticationService = require("../authentication/authentication.service");
const sendEmail = require("../utils/email");

exports.signUp = async (req, res, next) => {
    const user = await userService.createUser(req.body).catch(err => {
       return res.status(400).json({ status: "failed", err })
    });
    const message = "Thanks for signingUp! You have been signUp sccessfully ";
  try {
    await sendEmail({
      email: user.email,
      subject: "Insitution Signup",
      message,
    });
  } catch (err) {
        return res.status(400).json({ status: "failed", err })
  }
    res.status(201).json({
        status: "success",
        message: "signUp successfull",
    });
}

exports.login = async (req, res, next) => {
    const { name, password } = req.body;
    let userId = await userService.compareUserPasswordByName(name, password);
    if (userId) {
        const { access_token, refresh_token } = await authenticationService.signToken(userId).catch(err => {
            res.status(400).json({ status: "failed", err })
        });
        res.status(200).json({ status: "success", access_token, refresh_token });
    } else {
        res.status(400).json({ status: "failed", message: 'User Not Found' })
    }
}


exports.logOut = async (req, res, next) => {
    if (authenticationService.logout(req.headers.refreshtoken)) {
        res.status(200).json({ status: "success" });
    } else {
        res.status(401).json({ status: "failed" });
    }
}

exports.getRefreshToken = async (req, res, next) => {
    const accessToken = req.headers.access_token;
    if (accessToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }
    const refreshToken = await authenticationService.getNewRefereshToken(accessToken).catch(err => {
        res.status(401).json({ status: "failed", message: err });
    });
    res.status(200).json({ status: "success", refreshToken });
}