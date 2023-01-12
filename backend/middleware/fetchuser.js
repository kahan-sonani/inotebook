const jwt = require('jsonwebtoken')


const fetchUser = (req, res, next) => {

    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: 'Invalid token' })
    }
    try {
        const data = jwt.verify(token, process.env.JWT);
        req.user = data.user;

        next();
    } catch (e) {
        return res.status(401).send({ error: 'Invalid token', message: e.message })
    }
}

module.exports = fetchUser;