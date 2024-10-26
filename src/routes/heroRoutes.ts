import express from "express";
import { createHero, deleteHeroById, getAllHeroes, getHeroById, getHeroesPreview, updateHeroById } from "../controllers/heroController";

const router = express.Router();

router.get("/preview", getHeroesPreview);
router.get("/all", getAllHeroes);
router.get("/:id", getHeroById);
router.post("/", createHero);
router.put("/:id", updateHeroById);
router.delete("/:id", deleteHeroById);

export default router;