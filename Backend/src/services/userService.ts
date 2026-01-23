import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";

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
  password,
}: RegisterParams) => {
  try {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return { data: "user already exists!", statusCode: 400 };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await newUser.save();
    return {
      data: generateJWT({ firstName, lastName, email }),
      statusCode: 200,
    };
  } catch (err) {
    return { data: "Something Went Wrong!", statusCode: 500 };
  }
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return { data: "Incorrect email or password!", statusCode: 400 };
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
      return {
        data: generateJWT({
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          email,
        }),
        statusCode: 200,
      };
    }
    return { data: "Incorrect email or password!", statusCode: 400 };
  } catch (err) {
    return { data: "Something Went Wrong!", statusCode: 500 };
  }
};

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.SECRET_JWT || "");
};

interface getUserOrders {
  userId: string;
}

export const getUserOrders = async ({ userId }: getUserOrders) => {
  try {
    const orders = await orderModel.find({ userId });
    if (!orders) {
      return { data: "There is no Orders Created!", statusCode: 400 };
    }
    return { data: orders, statusCode: 200 };
  } catch (err) {
    return { data: "Something Went Wrong!", statusCode: 500 };
  }
};
