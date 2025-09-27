import express from "express";
import { userRoutes } from "./routes/user.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path"
import * as nodemailer from "nodemailer";
import { CronJob } from 'cron';
import * as schedule from "node-schedule";
import { getCelebrants } from './services/user.js';
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)


// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(join(__dirname, 'views/css')));
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// app.use(express.static(join(__dirname, 'public')));

app.use('/user', userRoutes);


schedule.scheduleJob('0 7 * * *', async () => {

    // 1️⃣  Configure a transporter that talks to Ethereal
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_ACCOUNT,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    const celebrant = await getCelebrants()
    // console.log(await getCelebrants())
    // 2️⃣  Send a message
    for await (const value of celebrant) {
        // console.log(value)
        transporter
            .sendMail({
                from: "Example app <no-reply@example.com>",
                to: value.email,
                subject: `Happy Birthday ${value.username}!!!`,
                text: ```Happy Birthday ${value.username},
                
                Wishing you long life and prosperity in Jesus name.```,
            })
            .then((info) => {
                console.log("Message sent: %s", info.messageId);
            })
            .catch(console.error);
    }

})

// Render the EJS form at root
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});