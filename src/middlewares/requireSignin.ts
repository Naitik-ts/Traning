import jwt, { JwtPayload } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

// Define a custom interface that extends the Request interface from Express
interface AuthenticatedRequest extends Request {
  payload?: {
    email: string;
    userId: string;
    role: string;
  };
}

export const requireSignIn = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const auth = req.get("Authorization");
  if (!auth) return res.status(400).send("Please provide the Auth");

  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) return res.status(400).send(err.message);

    // Check if decoded is a non-null object and has the properties you expect
    if (typeof decoded !== 'object' || decoded === null) {
      return res.status(401).send("Invalid token");
    }

    // Cast decoded to your expected JWT payload type
    const payload = decoded as JwtPayload & { email: string; user: string; role: string };

    // Now you can check the role
    if (req.baseUrl === "/project" && payload.role !== "CD") {
      return res.status(401).send("Only CD can access this route");
    }

    // Attach the payload to the request object
    req.payload = {
      email: payload.email,
      userId: payload.user,
      role: payload.role,
    };

    // Proceed to the next middleware
    next();
  });
};