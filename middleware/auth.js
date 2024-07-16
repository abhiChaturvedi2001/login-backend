const jwt = require('jsonwebtoken');
exports.authMiddleware = (req, res, next) => {
    // humara toke header se aayega 
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.statut(403).json({ message: "unauthorized jwt token required" });
    }

    // secret se decrpt and 

    try {
        //decode krega or check krega if it expries or not and so on
        const decoded = jwt.verify(auth, "secret-123455");
        req.user = decoded
        next();
    } catch (error) {
        res.status(401).json({message:"Wrorng or expiresd"})
    }
}