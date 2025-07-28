import { Request, Response } from "express";
import { storage } from "../storage.js";
import { checkAndUnlockAchievements } from "../apiRoutes.js";

export const createIntakeForm_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const formData = {
      userId,
      title: req.body.title,
      formType: req.body.formType,
      description: req.body.description,
      status: "pending" as const,
      priority: req.body.priority || "normal",
      dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
    };
    const form = await storage.createIntakeForm(formData);
    return res.status(200).send(form);
  } catch (error) {
    return res.status(500).send({ message: "Failed to create intake form" });
  }
};

export const getIntakeForms_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const forms = await storage.getIntakeForms(userId);
    return res.status(200).send(forms);
  } catch (error) {
    return res.status(500).send({ message: "Failed to get intake forms" });
  }
};

export const completeIntakeForm_controller = async (
  req: Request,
  res: Response
) => {
  try {
    const formId = req.params.id;
    const userId = res.locals.user._id;

    // Complete the form
    const form = await storage.completeIntakeForm(formId);

    // Award points and update user progress (50 points per form)
    const updatedProgress = await storage.updateUserStats(userId, 1, 50);

    // Check and unlock achievements
    await checkAndUnlockAchievements(userId, updatedProgress);

    return res.status(200).send(form);
  } catch (error) {
    return res.status(500).send({ message: "Failed to complete intake form" });
  }
};
