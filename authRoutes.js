const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const sendCode = require("./mail");


router.post("/verify", async (req, res)=>{

    const code = req.body.code;
    const token = req.cookies.token; 

    try {
        const ver_token = jwt.verify(token, process.env.FIRST_SECRET);
        const pwCheck = await bcrypt.compare(code, ver_token.hash);
        if(!pwCheck) return res.json({error:"Wrong Code"});

        if(!ver_token.uid){
            const users = JSON.parse(require("fs").readFileSync("users.json", "utf-8"));
            users.push({
                id:"id_"+Date.now(),
                email:ver_token.email
            });
            require("fs").writeFileSync("users.json",JSON.stringify(users, null, 3));

        }
        const authToken = jwt.sign({email:ver_token.email}, process.env.SECOND_SECRET,{expiresIn:1800})
        res.cookie("token", authToken);
        res.json({message:"Logged in", authToken});

    } catch (error) {
        res.send(error)
    }
    


});

router.post("/login", async (req, res)=>{

        const email = req.body.email;
        const users = JSON.parse(require("fs").readFileSync("users.json", "utf-8"));
        const user = users.find(u=>u.email == email);
        const uid = user ? user.id : null;
        const code = genCode(4);
        // Simulate email sending
        console.log("A mail to " +email + " With code " +code + " is sent");

        await sendCode(email, code);
        const hash = await bcrypt.hash(code, 10);
        const payload = {email,uid, hash}
        const secret = process.env.FIRST_SECRET;


        const token = await jwt.sign(payload, secret ,{expiresIn:100})

        res.cookie("token", token,{httpOnly:true});
        res.send(token);


});


module.exports = router;

function genCode(length = 6) {
    return require('crypto').randomBytes(length).toString('hex').slice(0, length);
}

