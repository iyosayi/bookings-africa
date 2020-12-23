import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import config from 'config'

type ID = ObjectId
interface IUserid {
  id: ID
  email: string
}

const JWT_SECRET = process.env.JWT_SECRET
const createToken = (userId: IUserid) => {
  // @ts-ignore
  return jwt.sign(userId, JWT_SECRET, { expiresIn: '1d' })
}

const decodeToken = (details: string) => {
  return jwt.decode(details)
}

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret)
}

const hashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 12)
  return hashed
}

const validatePassword = async (password: string, password2: string) => {
  const validPassord = await bcrypt.compare(password, password2)
  return validPassord
}

export { createToken, decodeToken, verifyToken, hashPassword, validatePassword }
