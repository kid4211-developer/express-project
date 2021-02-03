/* 회원 관련 API */
const Joi = require('@hapi/joi'); // import Joi from '@hapi/joi';
const User = require('../../models/user');

/* 회원 가입 : POST /api/auth/register */
// {
//     username: 'velopert',
//     password: 'mypass123'
// }
exports.register = async (req, res) => {
    // req Body 검증하기
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400);
        res.send(result.error);
        return;
    }

    const { username, password, email } = req.body;
    try {
        // username  이 이미 존재하는지 확인
        const exists = await User.findByUsername(username);
        if (exists) {
            res.status(409); // Conflict(이미 존재하는 계정)
            return;
        }

        const user = new User({ username, email });
        console.log(email);
        await user.setPassword(password); // 비밀번호 설정(Hashcode - 암호화)
        await user.save(); // 데이터베이스에 저장

        res.send(user.serialize());

        const token = user.generateToken();

        /* 생성한 토큰을 cookie에 담아서 사용하는 방식 */
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch (e) {
        res.throw(500, e);
    }
};

/* 로그인 : POST /api/auth/login */
// {
//     username: 'velopert',
//     password: 'mypass123'
// }
exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // username, password 가 없으면 에러 처리
    if (!username || !password) {
        res.response.status = 401; // Unauthorized
        return;
    }

    try {
        const user = await User.findByUsername(username);
        // 계정이 존재하지 않으면 에러 처리
        if (!user) {
            res.status(401).end();
            return;
        }
        const valid = await user.checkPassword(password);
        // 잘못된 비밀번호
        if (!valid) {
            res.status(402).end();
            return;
        }

        req.session.user = user;
        console.log('auth.ctrl - 로그인');
        console.log(req.session.user);

        // req.session.save(function () {
        //     res.redirect('/');
        // });

        const token = user.generateToken();

        /* 생성한 토큰을 cookie에 담아서 사용하는 방식 */
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
        res.send(user.serialize());
    } catch (e) {
        console.log(e.message);
    }
};

/* 회원 정보 체크 : GET /api/auth/check */
exports.check = async (req, res) => {
    const user = req.session.user;
    console.log('auth.ctrl - 회원정보체크');
    console.log(user);
    if (!user) {
        res.status(401).end();
        return;
    }
    res.send(user);
};

/* 로그아웃 : POST /api/auth/logut */
exports.logout = async (req, res) => {
    req.session.destroy(function (err) {
        // delete session
    });
    res.clearCookie('access_token'); //기존 cookie 삭제
    res.status(204).end(); //No Content
};
