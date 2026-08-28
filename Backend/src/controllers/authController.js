import { db } from "../db/db.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Using 1h for development, can be adjusted
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const foundUsers = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (foundUsers.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = foundUsers[0];

    if (user.status !== "active") {
      return res.status(403).json({ message: "Your account is deactivated" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        hostelBlock: user.hostelBlock,
        roomNo: user.roomNo,
        barcode: user.barcode,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
      }

      const foundUsers = await db.select().from(users).where(eq(users.id, decoded.id)).limit(1);

      if (foundUsers.length === 0 || foundUsers[0].status !== "active") {
        return res.status(403).json({ message: "User not found or inactive" });
      }

      const user = foundUsers[0];
      const newAccessToken = generateAccessToken(user);

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const me = async (req, res) => {
  try {
    const foundUsers = await db.select().from(users).where(eq(users.id, req.user.id)).limit(1);
    if (foundUsers.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = foundUsers[0];
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        hostelBlock: user.hostelBlock,
        roomNo: user.roomNo,
        barcode: user.barcode,
      },
    });
  } catch (error) {
    console.error("Get user details error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
