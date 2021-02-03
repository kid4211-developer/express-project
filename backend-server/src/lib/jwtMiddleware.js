const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies['access_token'];

    if (!token) return next(); // 토큰이 없음
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.state.user = {
            _id: decoded._id,
            username: decoded.username,
        };

        console.log(decoded);
        // 토큰 3.5일 미만 남으면 재발급
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
                httpOnly: true,
            });
        }

        return next();
    } catch (e) {
        // 토큰 검증 실패
        return next();
    }
};

module.exports = jwtMiddleware;
