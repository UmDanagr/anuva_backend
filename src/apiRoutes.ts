import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import session from "express-session";
import connectMongo from "connect-mongo";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { z } from "zod";

// Achievement logic
export async function checkAndUnlockAchievements(
  userId: string,
  progress: any
) {
  const achievements = [
    {
      badgeId: "first_form",
      title: "First Steps",
      description: "Complete your first assessment",
      iconName: "Target",
      color: "#10B981",
      target: 1,
      checkCondition: () => (progress.totalFormsCompleted || 0) >= 1,
    },
    {
      badgeId: "streak_3",
      title: "Committed",
      description: "Maintain a 3-day streak",
      iconName: "Calendar",
      color: "#F59E0B",
      target: 3,
      checkCondition: () => (progress.currentStreak || 0) >= 3,
    },
    {
      badgeId: "forms_5",
      title: "Dedicated",
      description: "Complete 5 assessments",
      iconName: "CheckCircle2",
      color: "#3B82F6",
      target: 5,
      checkCondition: () => (progress.totalFormsCompleted || 0) >= 5,
    },
    {
      badgeId: "neuro_specialist",
      title: "Neuro Specialist",
      description: "Complete all neurological assessments",
      iconName: "Brain",
      color: "#8B5CF6",
      target: 5,
      checkCondition: () => (progress.totalFormsCompleted || 0) >= 5,
    },
    {
      badgeId: "week_warrior",
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      iconName: "Shield",
      color: "#EF4444",
      target: 7,
      checkCondition: () => (progress.currentStreak || 0) >= 7,
    },
    {
      badgeId: "milestone_100",
      title: "Centurion",
      description: "Earn 100 experience points",
      iconName: "Star",
      color: "#F97316",
      target: 100,
      checkCondition: () => (progress.experiencePoints || 0) >= 100,
    },
  ];

  for (const achievement of achievements) {
    try {
      const existingAchievements = await storage.getAchievements(userId);
      const existing = existingAchievements.find(
        (a) => a.badgeId === achievement.badgeId
      );

      if (!existing) {
        await storage.createAchievement({
          userId: new mongoose.Types.ObjectId(userId),
          badgeType: "milestone",
          badgeId: achievement.badgeId,
          title: achievement.title,
          description: achievement.description,
          iconName: achievement.iconName,
          color: achievement.color,
          progress: 0,
          target: achievement.target,
          isUnlocked: false,
          earnedAt: new Date(),
        });
      } else if (!existing.isUnlocked && achievement.checkCondition()) {
        await storage.unlockAchievement(userId, achievement.badgeId);
      } else if (!existing.isUnlocked) {
        let currentProgress = 0;
        if (achievement.badgeId.includes("form")) {
          currentProgress = progress.totalFormsCompleted || 0;
        } else if (achievement.badgeId.includes("streak")) {
          currentProgress = progress.currentStreak || 0;
        } else if (achievement.badgeId.includes("milestone")) {
          currentProgress = progress.experiencePoints || 0;
        }
        await storage.updateAchievementProgress(
          userId,
          achievement.badgeId,
          currentProgress
        );
      }
    } catch (error) {
      console.error(
        `Error processing achievement ${achievement.badgeId}:`,
        error
      );
    }
  }
}

// Custom authentication schemas
const signupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration with MongoDB
  const MongoStore = connectMongo(session) as any;
  const sessionStore = new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
    ttl: 7 * 24 * 60 * 60, // 1 week
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "healthcare-secret-key-development",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      },
    })
  );

  // Custom authentication routes
  // app.post('/api/auth/signup', async (req, res) => {
  //   try {
  //     const userData = signupSchema.parse(req.body);

  //     // Check if user already exists
  //     const existingUser = await storage.getUserByEmail(userData.email);
  //     if (existingUser) {
  //       return res.status(400).json({ message: "User with this email already exists" });
  //     }

  //     // Hash password
  //     const passwordHash = await bcrypt.hash(userData.password, 12);

  //     // Create user
  //     const user = await storage.createUser({
  //       email: userData.email,
  //       firstName: userData.firstName,
  //       lastName: userData.lastName,
  //       dateOfBirth: userData.dateOfBirth,
  //       phoneNumber: userData.phoneNumber,
  //       passwordHash,
  //       profileImageUrl: null
  //     });
  //     console.log("user created", user);

  //     // Create session
  //     (req.session as any).userId = user._id.toString();

  //     res.status(201).json({
  //       message: "Account created successfully",
  //       user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName }
  //     });
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     res.status(400).json({ message: "Invalid signup data" });
  //   }
  // });

  // app.post('/api/auth/login', async (req, res) => {
  //   try {
  //     const { email, password } = loginSchema.parse(req.body);

  //     // Find user by email
  //     const user = await storage.getUserByEmail(email);
  //     if (!user || !user.passwordHash) {
  //       return res.status(401).json({ message: "Invalid email or password" });
  //     }

  //     // Verify password
  //     const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  //     if (!isValidPassword) {
  //       return res.status(401).json({ message: "Invalid email or password" });
  //     }

  //     // Create session
  //     (req.session as any).userId = user._id.toString();

  //     res.json({
  //       message: "Login successful",
  //       user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName }
  //     });
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     res.status(400).json({ message: "Invalid login data" });
  //   }
  // });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Custom auth middleware
  const requireAuth = async (req: any, res: any, next: any) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.locals.user = user;
    next();
  };

  // Auth routes
  // app.get('/api/auth/user', requireAuth, async (req: any, res) => {
  //   res.json(res.locals.user);
  // });

  // Protected routes use requireAuth instead of isAuthenticated
  // Intake forms routes
  app.get("/api/intake-forms", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const forms = await storage.getIntakeForms(userId);
      res.json(forms);
    } catch (error) {
      console.error("Error fetching intake forms:", error);
      res.status(500).json({ message: "Failed to fetch intake forms" });
    }
  });

  // Update user profile
  app.patch("/api/user/profile", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const updates = req.body;
      const user = await storage.updateUser(userId, updates);
      res.json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Create intake form
  app.post("/api/intake-forms", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const formData = {
        userId: new mongoose.Types.ObjectId(userId),
        title: req.body.title,
        formType: req.body.formType,
        description: req.body.description,
        status: "pending" as const,
        priority: req.body.priority || "normal",
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
      };
      const form = await storage.createIntakeForm(formData);
      res.json(form);
    } catch (error) {
      console.error("Error creating intake form:", error);
      res.status(500).json({ message: "Failed to create intake form" });
    }
  });

  app.patch(
    "/api/intake-forms/:id/complete",
    requireAuth,
    async (req: any, res) => {
      try {
        const formId = req.params.id;
        const userId = res.locals.user._id.toString();

        // Complete the form
        const form = await storage.completeIntakeForm(formId);

        // Award points and update user progress (50 points per form)
        const updatedProgress = await storage.updateUserStats(userId, 1, 50);

        // Check and unlock achievements
        await checkAndUnlockAchievements(userId, updatedProgress);

        res.json(form);
      } catch (error) {
        console.error("Error completing intake form:", error);
        res.status(500).json({ message: "Failed to complete intake form" });
      }
    }
  );

  // Health metrics routes
  app.get("/api/health-metrics", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const metrics = await storage.getHealthMetrics(userId);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching health metrics:", error);
      res.status(500).json({ message: "Failed to fetch health metrics" });
    }
  });

  app.post("/api/health-metrics", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const metricData = {
        userId: new mongoose.Types.ObjectId(userId),
        value: req.body.value,
        metricType: req.body.metricType,
      };
      const metric = await storage.createHealthMetric(metricData);
      res.json(metric);
    } catch (error) {
      console.error("Error creating health metric:", error);
      res.status(500).json({ message: "Failed to create health metric" });
    }
  });

  // Lab results routes
  app.get("/api/lab-results", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const results = await storage.getLabResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching lab results:", error);
      res.status(500).json({ message: "Failed to fetch lab results" });
    }
  });

  app.post("/api/lab-results", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const resultData = {
        userId: new mongoose.Types.ObjectId(userId),
        status: req.body.status,
        result: req.body.result,
        testName: req.body.testName,
        testDate: new Date(req.body.testDate),
      };
      const result = await storage.createLabResult(resultData);
      res.json(result);
    } catch (error) {
      console.error("Error creating lab result:", error);
      res.status(500).json({ message: "Failed to create lab result" });
    }
  });

  // Appointments routes
  app.get("/api/appointments", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const appointments = await storage.getAppointments(userId);
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  app.get("/api/appointments/upcoming", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const appointments = await storage.getUpcomingAppointments(userId);
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching upcoming appointments:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch upcoming appointments" });
    }
  });

  app.post("/api/appointments", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const appointmentData = {
        userId: new mongoose.Types.ObjectId(userId),
        providerName: req.body.providerName,
        appointmentType: req.body.appointmentType,
        scheduledAt: new Date(req.body.scheduledAt),
      };
      const appointment = await storage.createAppointment(appointmentData);
      res.json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  // Emergency contacts routes
  app.get("/api/emergency-contacts", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const contacts = await storage.getEmergencyContacts(userId);
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching emergency contacts:", error);
      res.status(500).json({ message: "Failed to fetch emergency contacts" });
    }
  });

  app.post("/api/emergency-contacts", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const contactData = {
        userId: new mongoose.Types.ObjectId(userId),
        name: req.body.name,
        relationship: req.body.relationship,
        phone: req.body.phone,
      };
      const contact = await storage.createEmergencyContact(contactData);
      res.json(contact);
    } catch (error) {
      console.error("Error creating emergency contact:", error);
      res.status(500).json({ message: "Failed to create emergency contact" });
    }
  });

  app.patch(
    "/api/emergency-contacts/:id",
    requireAuth,
    async (req: any, res) => {
      try {
        const contactId = req.params.id;
        const updates = req.body;
        const contact = await storage.updateEmergencyContact(
          contactId,
          updates
        );
        res.json(contact);
      } catch (error) {
        console.error("Error updating emergency contact:", error);
        res.status(500).json({ message: "Failed to update emergency contact" });
      }
    }
  );

  app.delete(
    "/api/emergency-contacts/:id",
    requireAuth,
    async (req: any, res) => {
      try {
        const contactId = req.params.id;
        await storage.deleteEmergencyContact(contactId);
        res.json({ message: "Emergency contact deleted successfully" });
      } catch (error) {
        console.error("Error deleting emergency contact:", error);
        res.status(500).json({ message: "Failed to delete emergency contact" });
      }
    }
  );

  // User settings routes
  app.get("/api/user-settings", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const settings = await storage.getUserSettings(userId);
      res.json(settings || {});
    } catch (error) {
      console.error("Error fetching user settings:", error);
      res.status(500).json({ message: "Failed to fetch user settings" });
    }
  });

  app.post("/api/user-settings", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const settingsData = {
        userId: new mongoose.Types.ObjectId(userId),
      };
      const settings = await storage.upsertUserSettings(settingsData);
      res.json(settings);
    } catch (error) {
      console.error("Error updating user settings:", error);
      res.status(500).json({ message: "Failed to update user settings" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const achievements = await storage.getAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.post("/api/achievements", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      const achievement = await storage.createAchievement({
        ...req.body,
        userId: new mongoose.Types.ObjectId(userId),
      });
      res.json(achievement);
    } catch (error) {
      console.error("Error creating achievement:", error);
      res.status(500).json({ message: "Failed to create achievement" });
    }
  });

  app.patch(
    "/api/achievements/:badgeId/unlock",
    requireAuth,
    async (req: any, res) => {
      try {
        const userId = res.locals.user._id.toString();
        const { badgeId } = req.params;
        const achievement = await storage.unlockAchievement(userId, badgeId);
        res.json(achievement);
      } catch (error) {
        console.error("Error unlocking achievement:", error);
        res.status(500).json({ message: "Failed to unlock achievement" });
      }
    }
  );

  // User progress routes
  app.get("/api/user-progress", requireAuth, async (req: any, res) => {
    try {
      const userId = res.locals.user._id.toString();
      let progress = await storage.getUserProgress(userId);

      // Create default progress if doesn't exist
      if (!progress) {
        progress = await storage.upsertUserProgress({
          userId: new mongoose.Types.ObjectId(userId),
          totalFormsCompleted: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalPoints: 0,
          level: 1,
          experiencePoints: 0,
        });
      }

      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
