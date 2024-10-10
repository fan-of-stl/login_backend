const jwt = require('jsonwebtoken')

const generareAccessToken = (data)=>{
    secretKey = process.env.SECRET_KEY

    const payload = {
        id: data._id,
        username: data.username,
        name: data.name
    }
    return jwt.sign(payload, secretKey, {expiresIn: '1000s'})
}

module.exports = generareAccessToken