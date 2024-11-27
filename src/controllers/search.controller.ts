import { Request, Response } from "express";
import prisma from "../lib/prisma";

//search offers by crop name
export const searchOffer = async (req: Request, res: Response) => {
  try {
    const { cropName } = req.query;
    const users = await prisma.user.findMany({
      where: {
        role: req.user?.role,
      },
    });
    const searchSpace = users.map((user) => user.id);
    if (!cropName) {
      return res
        .status(400)
        .json({ error: "Missing cropName query parameter." });
    }
    const offers = await prisma.offer.findMany({
      where: {
        cropName: { contains: cropName as string, mode: "insensitive" },
        createdBy: { notIn: searchSpace}
      },
    });

    return res.status(200).json({ offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
