import { Request, Response } from "express";
import { storage } from "../storage.js";

export const getUserProgress_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    let progress = await storage.getUserProgress(userId);

    if (!progress) {
      progress = await storage.upsertUserProgress({
        userId,
        totalFormsCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalPoints: 0,
        level: 1,
        experiencePoints: 0,
      });
    }

    return res.status(200).send(progress);
  } catch (error) {
    return res.status(500).send({ message: "Failed to fetch user progress" });
  }
};
