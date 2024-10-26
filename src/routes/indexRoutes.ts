import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to my API!",
    endpoints: [
      { path: "/heroes/preview", method: "GET", description: "First 5 superheroes" },
      { path: "/heroes/all", method: "GET", description: "All heroes" },
      { path: "/heroes/:id", method: "GET", description: "Get hero by ID" },
      { path: "/heroes", method: "POST", description: "Create a hero" },
      { path: "/heroes/:id", method: "PUT", description: "Update a hero" },
      { path: "/heroes/:id", method: "DELETE", description: "Delete a hero" }
    ]
  });
});

export default router;
