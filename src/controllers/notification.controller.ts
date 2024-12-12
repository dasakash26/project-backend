import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getNotification = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user || !user.id) {
    return res.status(401).json({ error: "Unauthorized: User not logged in." });
  }

  const { id } = user;
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId  : id,
      },
    });
    
    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
