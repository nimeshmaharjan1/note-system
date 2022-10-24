import applyRateLimit from "@lib/rate-limit";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import { getCookie, deleteCookie } from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyRateLimit(req, res);
  } catch (error) {
    return res.status(429).json({ message: "Too many requests. Please wait 60 seconds." });
  }
  const { method } = req;
  if (method === "POST") {
    const jwtCookie = getCookie("jwt", { req, res }) as string;
    if (!jwtCookie) return res.status(204);

    deleteCookie("jwt", { req, res, httpOnly: true, sameSite: "none" });
    res.status(200).json({ message: "User has been logged out." });
  } else {
    res.status(400).json({ message: "HTTP Method not allowed." });
  }
}
