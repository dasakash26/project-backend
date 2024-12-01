import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createNegotiation = async (req: Request, res: Response) => {
  try {
    const currentTerms = await prisma.currentTerms.create({
      data: {
        ...req.body,
      },
    });
    console.log("req.body", req.body);
    console.log("currentTerms", currentTerms);
    const negotiation = await prisma.negotiation.create({
      data: {
        currentTermsId: currentTerms.id,
        createdById: req.body.createdBy,
        offeredToId: req.user.id,
        details: "negotiation details",
        turn: req.user.id,
        ongoing: true,
      },
    });
    console.log("negotiation", negotiation);
    console.log("success");
    res.status(201).json({ message: "Negotiation created successfully."});
  } catch (error) {
    console.log("Error creating negotiation:", error);
    res.status(500).json({ error: "Failed to create negotiation" });
  }
};

export const getNegotiations = async (req: Request, res: Response) => {
  try {
    const negotiations = await prisma.negotiation.findMany();
    const currentTerms = await prisma.currentTerms.findMany();
    console.log("negotiations", negotiations);
    res.status(200).json({ negotiations,currentTerms });
  } catch (error) {
    console.log("Error getting negotiations:", error);
    res.status(500).json({ error: "Failed to get negotiations" });
  }
};
