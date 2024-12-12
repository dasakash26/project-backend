import { Request, Response } from "express";
import prisma from "../lib/prisma";

//search offers by crop name
export const searchOffer = async (req: Request, res: Response) => {
  try {
    const { cropName } = req.query || { cropName: " " };
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

    //loop through the offers and check title exact match in offer array of objects
    const offersByTitle = offers.filter(
      (offer) =>
        offer.cropName.toLowerCase() === (cropName as string).toLowerCase()
    );

    //recommendation system
    if (offersByTitle.length === 0) {
      //save the crop name and the buyer in the database
      const prev = await prisma.requiredCrops.findFirst({
        where: { cropName: cropName as string },
      });
      if (prev) {
        await prisma.requiredCrops.update({
          where: { cropName: cropName as string },
          data: {
            userId: {
              push: req.user?.id,
            },
          },
        });
      } else {
        await prisma.requiredCrops.create({
          data: {
            cropName: cropName as string,
            userId: [req.user?.id],
          },
        });
      }
      return res.status(200).json({
        message: "No offers found. We will get back to you soon.",
        offers,
      });
    }

    return res.status(200).json({ offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//get all offers
export const getInitOffers = async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      where: {
        createdByUser: {
          role: { not: req.user?.role },
        },
      },
      orderBy: {
        harvestTime: "asc",
      },
    });

    return res.status(200).json({ offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
