import { Response } from "express";

export const handleError = (res: Response, err: unknown) => {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(501).json({ message: "Unknown error" })
  }
};