
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@repo/db";
import crypto from "crypto";

// Fetching the API URL and key from environment variables
const CRUD_API_URL = process.env.NEXT_PUBLIC_CRUD_API_URL;
const CRUD_API_KEY = process.env.NEXT_PUBLIC_CRUD_API_KEY;

if (!CRUD_API_URL || !CRUD_API_KEY) {
  throw new Error("API URL or API Key is missing from environment variables.");
}

// Generate API key and URL for the user
const generateApiKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const generateApiUrl = (apiKey: string) => {
  return `${CRUD_API_URL}?apiKey=${apiKey}`;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, name } = req.body;

      // Create a new user with generated API key and URL
      const apiKey = generateApiKey();
      const apiUrl = generateApiUrl(apiKey);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          apiKey,
          apiUrl,
          requestCount: 0,
          requestLimit: 4,
        },
      });

      res.status(201).json({ user, apiKey, apiUrl});
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
