const express = require("express");
const router = express.Router();
const path = require('path');
const admin = require('firebase-admin');
const auth = admin.auth();

// Rutas Firebase
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'register.html'))
})

router.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {
      await auth.createUser({
        email,
        password
      });
      res.redirect("/login")

    } catch (error) {
        console.error(`internal error: ${error}`)
        res.redirect("/register")
    }
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'login.html'))
})

router.post("/login", async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) {
        return res.json({ success: false, error: 'No ID token provided' });
    }
    try {
        await auth.verifyIdToken(idToken)
        res.cookie('token', idToken, {httpOnly: true, secure: false});
        res.json({success: true})
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;