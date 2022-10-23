import { connectDb } from "./../../../lib/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

import User from "@models/user";
import Note from "@models/note";

import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const users = await User.find().select("-password").lean();
        if (!users) {
          return res.status(404).json({ message: "No users found." });
        }
        res.status(201).json({ message: "Users have been successfully fetched", users });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong please try again.", error });
      }
    case "POST":
      try {
        const { username, password, roles } = body;
        if (!username || !password || !Array.isArray(roles) || !roles.length) {
          res.status(400).json({ message: "All fields are required." });
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
          res.status(400).json({ message: "Invalid user data received." });
        }
      } catch (error) {
        res.status(500).json({ message: "Something went wrong please try again.", error });
      }
  }
}
