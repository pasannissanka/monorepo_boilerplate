import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../../models/User";
import { GenerateAuthTokens, publicKEYACCESS, publicKEYREFRESH, TokenPayload } from "./auth_tokens";

export async function AuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies["access_token"];
  const refreshToken = req.cookies["refresh_token"];

  if (!refreshToken && !accessToken) {
    return next();
  }
  try {
    const decoded = verify(accessToken, publicKEYACCESS, {
      algorithms: ["RS256"],
    });

    (req as any).user = decoded;

    return next();
  } catch (error) { }

  if (!refreshToken) {
    return next();
  }
  let data: TokenPayload;
  try {
    data = verify(refreshToken, publicKEYREFRESH, {
      algorithms: ["RS256"],
    }) as TokenPayload;
  } catch (error) {
    return next();
  }

  const user = await User.findOne({ where: { id: data.uuid } });

  if (!user || user.count !== data.count) {
    return next();
  }

  const token = GenerateAuthTokens(user);

  res.cookie("refresh_token", token.refreshToken, {
    expires: new Date(Date.now() + 86400000 * 7),
  });
  res.cookie("access_token", token.accessToken, {
    expires: new Date(Date.now() + 3600000),
  });

  (req as any).user = data;
  return next();
}