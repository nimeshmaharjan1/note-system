import bcrypt from "bcryptjs";

import User from "@models/user";
import { connectDb } from "@lib/mongo";

import applyRateLimit from "@lib/rate-limit";

import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import jwt from "jsonwebtoken";

import { setCookie } from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyRateLimit(req, res);
  } catch (error) {
    return res.status(429).json({ message: "Too many requests. Please wait 60 seconds." });
  }
  const { method } = req;
  if (method === "POST") {
    try {
      await connectDb();
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      const user = await User.findOne({ username }).exec();
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "Unauthorized." });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) return res.status(401).json({ message: "Please check your password again!" });

      /**
       * Create access token
       */
      const accessToken = jwt.sign(
        { UserInfo: { username: user.username, roles: user.roles } },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "10m" },
      );

      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "10m" },
      );

      setCookie("jwt", refreshToken, {
        req,
        res,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
      });
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong please try again.", error });
    }
  } else {
    res.status(400).json({ message: "HTTP Method not allowed." });
  }
}
