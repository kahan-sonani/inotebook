const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');


router.post('/createuser', [

    body('email', 'Email not valid').isEmail(),
    body('name', 'Name required').isLength({ min: 5 }),
    body('password', 'Password must be aleast 5 chars').isLength({ min: 5 })

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email must not be taken." })
        }
        const salt = await bcrypt.genSalt(10);
        const sPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({

            name: req.body.name,
            email: req.body.email,
            date: req.body.date,
            password: sPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT)
        res.json({ authtoken: authtoken })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: 'Internal Server Error', message: e.message })
    }
})

router.post('/login', [
    body('email', 'Email not valid').isEmail(),
    body('password', 'Password must be aleast 5 chars').isLength({ min: 5 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(payload, process.env.JWT)
        res.json({ authtoken: authtoken })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: 'Internal Server Error', message: e.message })
    }
})

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id

        const user = await User.findById(userId).select("-password")

        res.send(user)
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: 'Internal Server Error', message: e.message })
    }
})

module.exports = router