import { Request, Response } from "express";
import prisma from "../lib/prisma";

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
    const priceInFloat = parseFloat(price);
    const quantityInInt = parseInt(quantity);
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
        price: priceInFloat,
        quantity: quantityInInt,
        harvestTime: harvestTime ? new Date(harvestTime) : null,
        location,
        offerDuration: durationInDays,
        paymentTerms,
        createdBy: req.user.id,
      },
    });

    //check if the offer created exists in the required crops table
    //if exists, then push notification to the buyer
    const requiredCrop = await prisma.requiredCrops.findFirst({
      where: { cropName },
    });
    if (requiredCrop) {
      //send notification to the buyer
      console.log(
        "Notification sent to the buyer " +
          requiredCrop.userId +
          " for the crop " +
          newOffer.id
      );
      //add to the notification table
      const notification = await prisma.notification.create({
        data: {
          userId: requiredCrop.userId[0],
          title: "Your Crop Offer Available",
          message: `An offer for crop ${cropName} is now available.`,
          offerId: [newOffer.id],
        },
      });
    }

    return res
      .status(201)
      .json({ message: "Offer created successfully.", offer: newOffer });
  } catch (error) {
    console.error("Error creating offer:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//get offer by id
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
