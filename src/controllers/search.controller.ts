import { Request, Response } from "express";
import prisma from "../lib/prisma";

//search offers by crop name
export const searchOffer = async (req: Request, res: Response) => {
  try {
    const { cropName } = req.query;
    const role = req.user?.role;

    if (!cropName) {
      return res.status(400).json({ error: "Missing query parameter." });
    }

    const offers = await prisma.offer.findMany({
      where: {
        cropName: { contains: cropName as string, mode: "insensitive" },
        createdByUser: {
          role: { not: role },
        },
      },
    });

    return res.status(200).json({ offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
