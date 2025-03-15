import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // true for HTTPS
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;

//?Synchronously sign the given payload into a JSON Web Token string payload - Payload to sign, could be an literal, buffer or string secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA. [options] - Options for the signature returns - The JSON Web Token string

//?1/3
// Response.cookie(name: string, val: string, options: CookieOptions): this

// Set cookie name to val, with the given options.

// Options:

// maxAge max-age in milliseconds, converted to expires
// signed sign the cookie
// path defaults to "/"
// Examples:

// "Remember Me" for 15 minutes res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });

// save as above res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
