import { Request, Response } from "express";
import prisma from "../lib/prisma"; // Ensure this is the correct import for your Prisma client

export const createOffer = async (req: Request, res: Response) => {
  try {
    const {
      cropName,
      description,
      cropType,
      price,
      quantity,
      harvestTime,
      location,
      offerDuration,
      paymentTerms,
    } = req.body;

    const durationInDays = parseInt(offerDuration);
    // const priceInFloat = parseFloat(price);
    if (
      !cropName ||
      !cropType ||
      !price ||
      !offerDuration ||
      !quantity ||
      !location
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newOffer = await prisma.offer.create({
      data: {
        cropName,
        description,
        cropType,
        price,
        quantity,
        harvestTime: harvestTime ? new Date(harvestTime) : null,
        location,
        offerDuration,
        paymentTerms,
        createdBy: req.user.id,
      },
    });

    return res
      .status(201)
      .json({ message: "Offer created successfully.", offer: newOffer });
  } catch (error) {
    console.error("Error creating offer:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    // Fetch offer from the database
    const offer = await prisma.offer.findUnique({
      where: { id: id },
    });

    if (!offer) {
      return res.status(404).json({ error: "Offer not found." });
    }

    return res.status(200).json({ offer });
  } catch (error) {
    console.error("Error fetching offer:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const searchOffer = async (req: Request, res: Response) => {
  try {
    const { cropName } = req.query;

    if (!cropName) {
      return res.status(400).json({ error: "Missing cropName query parameter." });
    }

    const offers = await prisma.offer.findMany({
      where: {
        cropName: { contains: cropName as string, mode: 'insensitive' },
      },
    });

    return res.status(200).json({ offers });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
