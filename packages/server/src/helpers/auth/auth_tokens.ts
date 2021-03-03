import { readFileSync } from "fs";
import * as jwt from "jsonwebtoken";
import * as path from "path";
import { User } from "../../models/User";

// Create a RSA public private keypair from http://travistidwell.com/jsencrypt/demo/
// or
// https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
const privateKEYACCESS = readFileSync(
	path.resolve("./keys/private_access.key"),
	"utf8"
);
const privateKEYREFRESH = readFileSync(
	path.resolve("./keys/private_refresh.key"),
	"utf8"
);

export interface TokenPayload {
  uuid: string,
  email: string,
  count?: number
}

export function GenerateAuthTokens(user: User) {
	const accessToken = jwt.sign(
		{ uuid: user.id, email: user.email },
		privateKEYACCESS,
		{
			algorithm: "RS256",
			expiresIn: "1h",
		}
	);
	const refreshToken = jwt.sign(
		{ uuid: user.id, email: user.email, count: user.count },
		privateKEYREFRESH,
		{
			algorithm: "RS256",
			expiresIn: "7d",
		}
	);

	return {
		accessToken,
		refreshToken,
	};
}
