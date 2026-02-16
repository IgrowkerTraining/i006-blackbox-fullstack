import { Request, Response } from "express";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      // const newUser = await userService.create({ name, email, password });

      res.status(201).json({
        user: "new user",
        message: "User registered successfully",
      });
    } catch (error: any) {
      if (error.message === "User already exists") {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required",
        });
      }

      // const user = await userService.authenticate(email, password);

      res.json({
        user: "user",
        token: "mock-jwt-token-" + "id user",
        message: "Login successful",
      });
    } catch (error: any) {
      if (error.message === "Invalid email or password") {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: "Login failed" });
    }
  }
}

export default new AuthController();
