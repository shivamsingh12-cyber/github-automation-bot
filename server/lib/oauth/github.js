import { GitHub } from "arctic";
import dotenv from "dotenv"
dotenv.config();

export const github = new GitHub(
    process.env.GitHub_CLIENT_ID,
    process.env.GitHub_CLIENT_SECRET,
    `${process.env.BACKEND_URL}/github/callback`,
)

