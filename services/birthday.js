import 'dotenv/config'
import * as nodemailer from "nodemailer";
import { CronJob } from 'cron';
import * as schedule from "node-schedule";
import { getCelebrants, createUser } from './user.js';
import { get } from 'http';

// console.log(await createUser({username: "Gunju2", email: "pythonseun2@gmail.com", dob: new Date("2025-9-13")}))
// console.log(await getCelebrants())
