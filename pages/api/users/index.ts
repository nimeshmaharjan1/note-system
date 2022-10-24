import { connectDb } from "./../../../lib/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

import User from "@models/user";
import Note from "@models/note";

import { getCookie } from "cookies-next";

import bcrypt from "bcryptjs";
import applyRateLimit from "@lib/rate-limit";

import jwt from "jsonwebtoken";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Not authorized to view this content." });
  try {
    await applyRateLimit(req, res);
  } catch (error) {
    return res.status(429).json({ message: "Too many requests. Please wait 60 seconds." });
  }
  await connectDb();
  const { method, body } = req;
  switch (method) {
    case "PUT":
      return res.status(400).json({ message: "Invalid http action." });
    case "GET":
      try {
        const users = await User.find().select("-password").lean();
        if (!users) {
          return res.status(404).json({ message: "No users found." });
        }
        return res.status(201).json({ message: "Users have been successfully fetched", users });
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong please try again.", error });
      }
    case "POST":
      try {
        const { username, password, roles } = body;
        if (!username || !password) {
          return res.status(400).json({ message: "All fields are required." });
        }
        //Check for duplicate
        const duplicate = await User.findOne({ username }).lean().exec();
        if (duplicate) {
          return res
            .status(409)
            .json({ message: "Duplicate username, please try a different username." });
        }
        //Hash password
        const hashedPw = await bcrypt.hash(password, 10);
        const userObject = { username, password: hashedPw, roles };
        const user = await User.create(userObject);
        if (user) {
          return res
            .status(201)
            .json({ message: `New user ${username} has been successfully created.`, user });
        } else {
          return res.status(400).json({ message: "Invalid user data received." });
        }
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong please try again.", error });
      }
  }
}
