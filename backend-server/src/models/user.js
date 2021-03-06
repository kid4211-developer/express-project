/* User schema, model 생성 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
    email: String,
});

/* 인스턴스 메서드 선언 - 모델을 통해 만든 문서 인스턴스에서 사용 가능한 메서드
 * 인스턴스 메서드는 함수 내부의 this에 접근해야 하므로 function을 사용해야함 (this : 문서 인스턴스를 가르킴) */
UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword); // true or false
    return result;
};

/* hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환해준뒤 delete를 통해 해당 필드를 지워줌 */
UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

/* Token 발급 인스턴스 메서드 */
UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        // 첫번째 파라미터엔 토큰 안에 집어넣고 싶은 데이터를 넣습니다
        {
            _id: this.id,
            username: this.username,
            email: this.email,
        },
        process.env.JWT_SECRET, // 두번째 파라미터에는 JWT 암호를 넣습니다
        {
            expiresIn: '7d', // 7일동안 유효함
        },
    );
    return token;
};

/* static 메서드 - 모델에서 바로 사용할 수 있는 함수 */
UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
