import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "./models";

const app = express();
dotenv.config();

app.get("/test", async (req: Request, res: Response, next: NextFunction) => {
    const result = User.create({
        uuid: 'c154a448-eb01-453b-a379-626c773015ee',
        email: 'test@gmail.com',
        first_name: 'First',
        last_name: 'Last',
        username: 'Username'
    });
    const users = await User.findAll({});
    res.status(200).json(users);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})