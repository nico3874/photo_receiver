import dotenv from 'dotenv'

dotenv.config()
export const email = process.env.email
export const scopes = process.env.scopes
export const key = process.env.key