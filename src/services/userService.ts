

import userModel from "../models/userModel";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

interface RegisterParams {

  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email })

  // if (findUser) {
  //   return { error: { message: "User already exists!" } }
  // }
  if (findUser) {
    return { data: "User already exists!", statusCode: 400 }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new userModel({ email, password: hashedPassword, firstName, lastName })
  await newUser.save()
  // return newUser
  // return { data: newUser, statusCode: 200 }
  return {
    data: genereteJWT(
      {
        firstName, lastName, email
      }),

    statusCode: 200
  }
}

interface LoginParams {
  email: string;
  password: string
}


//function Login
export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email })

  if (!findUser) {
    // return {error:{message: "incorect email or password!"} }
    return { data: "incorrect mail or password", statusCode: 400 }
  }

  // const passwordMatch = password === findUser.password;

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    // return findUser;
    // return { data: findUser, statusCode: 200 }
    return {
      data: genereteJWT(
        {
          email,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
        }
      ),
      statusCode: 200
    }
  }


  // return {error:{message:"Incorrect email or password"}}
  return { data: "Incorrect mail or password", statusCode: 400 }

}

const genereteJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || '');
}