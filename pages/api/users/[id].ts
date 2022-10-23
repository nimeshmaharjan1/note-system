import { connectDb } from "@lib/mongo";

import User from "@models/user";
import Note from "@models/note";

import bcrypt from "bcryptjs";

import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb();
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id).exec();
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json(error);
      }
    case "PUT":
      try {
        const { username, password, roles, isActive } = req.body;
        if (
          !id ||
          !username ||
          !Array.isArray(roles) ||
          !roles.length ||
          typeof isActive !== "boolean"
        ) {
          return res.status(400).json({ message: "All fields are required to update user." });
        }
        const user = await User.findById(id).exec();
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
        const duplicate = await User.findOne({ username }).lean().exec();
        //Allow updates to original user
        if (duplicate && duplicate?._id.toString() !== id) {
          return res.status(409).json({ message: "Username already exists." });
        }
        user.username = username;
        user.roles = roles;
        user.isActive = isActive;
        if (password) {
          user.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await user.save();
        return res
          .status(201)
          .json({ message: `User ${username} updated successfully`, updatedUser });
      } catch (error) {
        return res.status(500).json(error);
      }
    case "DELETE":
      if (!id) {
        return res.status(400).json({ message: "User ID is required." });
      }
      const notes = (await Note.findOne({ user: id }).lean().exec()) as any;
      if (notes?.length) {
        return res.status(400).json({ message: "User has assigned notes." });
      }
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const result = await user.deleteOne();
      return res.status(200).json({
        message: `Username ${result.username} with ID ${result.id} has been successfully deleted.`,
      });
  }
};
export default handler;
