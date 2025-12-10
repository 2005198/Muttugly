import express from 'express';
import path from 'node:path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('../userpage'))

const db = new Database('../userfile/muttugly.db');
const SECRET = "kadkfasdnjsdfsabfsMUKKARAMkjlkjlk"

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT,
        item_id INTEGER,
        name TEXT,
        price TEXT,
        qty INTEGER
    )
`);

app.post('/user', (req, res) => {
    const { Email, password } = req.body;
    if (!Email || !password) {
        return res.status(402).json({ message: "error with email or password" })
    }
    try {
        db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(Email, password);
        res.status(200).json({ message: "user created successfully" })
    } catch (err) {
        res.status(400).json({ message: "user already exists" })
    }
});

app.post('/checkuser', (req, res) => {
    const { Email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(Email);
    if (user) {
        const token = jwt.sign({ UserEmail: user.email }, SECRET, { expiresIn: "2h" });
        res.cookie("authorization", token, { maxAge: 360000000 })
        return res.status(200).json({ message: "login successful", body: { token } })
    }
    res.status(400).json({ message: "no user found !!" });
});

function checklogin(req, res, next) {
    const cookie = req.cookies.authorization;
    if (!cookie) {
        return res.status(400).json("User not Found")
    }
    const token = jwt.decode(cookie);
    const email = token['UserEmail'];
    req.UserEmail = email;
    if (email) {
        next();
    } else {
        res.status(402).json({ message: "login first!!" })
    }
}

app.post('/post', checklogin, (req, res) => {
    const { cart_id, cart_name, cart_price, cart_qty } = req.body;
    const userEmail = req.UserEmail;

    const existing = db.prepare("SELECT * FROM cart WHERE user_email = ? AND item_id = ?").get(userEmail, cart_id);

    if (existing) {
        db.prepare("UPDATE cart SET qty = qty + 1 WHERE user_email = ? AND item_id = ?").run(userEmail, cart_id);
        return res.status(200).json({ message: 'Cart item updated' });
    }

    db.prepare("INSERT INTO cart (user_email, item_id, name, price, qty) VALUES (?, ?, ?, ?, ?)").run(userEmail, cart_id, cart_name, cart_price, cart_qty);
    res.status(200).json({ message: 'Cart item saved' });
});

app.get("/getitems", checklogin, (req, res) => {
    const email = req.UserEmail;
    const cart = db.prepare("SELECT * FROM cart WHERE user_email = ?").all(email);
    return res.status(200).json({ cart })
});

app.patch("/cartupdate", checklogin, (req, res) => {
    const { qty, name } = req.body;
    const email = req.UserEmail;
    db.prepare("UPDATE cart SET qty = ? WHERE user_email = ? AND name = ?").run(qty, email, name);
    return res.status(200).json({ message: "updated cart" })
});

app.delete("/deleteItem", checklogin, (req, res) => {
    const { name } = req.body;
    const email = req.UserEmail;
    db.prepare("DELETE FROM cart WHERE user_email = ? AND name = ?").run(email, name.trim());
    return res.status(200).json({ message: "deleted item" })
});

app.post("/logout", (req, res) => {
    res.clearCookie("authorization");
    return res.status(200).json({ message: "logged out" })
});

app.listen(3000, (err) => {
    if (err) { console.error(err) }
    else { console.log(`listening at 3000`) }
})
