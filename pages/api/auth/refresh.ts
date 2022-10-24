import { connectDb } from "@lib/mongo";
import User from "@models/user";
import applyRateLimit from "@lib/rate-limit";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import { getCookie } from "cookies-next";

import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyRateLimit(req, res);
  } catch (error) {
    return res.status(429).json({ message: "Too many requests. Please wait 60 seconds." });
  }
  await connectDb();
  const { method } = req;
  if (method === "GET") {
    try {
      const jwtCookie = getCookie("jwt", { req, res }) as string;
      if (!jwtCookie)
        return res.status(401).json({ message: "Unauthorized. JWT Token not found." });
      const refreshToken = jwtCookie;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err, decoded: any) => {
          if (err) return res.status(403).json({ message: "Forbidden." });

          const foundUser = await User.findOne({ username: decoded.username });

          if (!foundUser) return res.status(401).json({ message: "Unauthorized." });

          const accessToken = jwt.sign(
            {
              UserInfo: {
                username: foundUser.username,
                roles: foundUser.roles,
              },
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "1d" },
          );
          return res
            .status(200)
            .json({ message: "Successfully fetched refresh token", accessToken });
        },
      );
    } catch (error) {
      res.status(500).json({ message: "Something went wrong during refreshing jwt token." });
    }
  } else {
    res.status(400).json({ message: "HTTP Method not allowed." });
  }
}
