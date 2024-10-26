import { RequestHandler } from "express";
import { HeroParams } from "../types/HeroParams";
import { handleError } from "../helpers/errorHandler";
import { readHeroesFromFile, writeHeroesToFile } from "../helpers/fileOperations";
import { Hero } from "../types/Hero";

export const getHeroesPreview: RequestHandler = async (req, res) => {
  try {
    const heroes = await readHeroesFromFile();
    res.json(heroes.slice(0, 5));
  } catch (err) {
    handleError(res, err);
  }
};

export const getAllHeroes: RequestHandler = async (req, res) => {
  try {
    const heroes = await readHeroesFromFile();
    res.json(heroes);
  } catch (err) {
    handleError(res, err);
  }
};

export const getHeroById: RequestHandler<HeroParams> = async (req, res) => {
  const heroId = req.params.id;

  try {
    const heroes = await readHeroesFromFile();
    const hero = heroes.find((h) => h.id === heroId);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json(hero);
  } catch (err) {
    handleError(res, err);
  }
};

export const createHero: RequestHandler = async (req, res) => {
  const newHero: Hero = req.body;
  try {
    const heroes = await readHeroesFromFile();
    heroes.push(newHero);
    await writeHeroesToFile(heroes);
    res.status(201).json(newHero);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateHeroById: RequestHandler<HeroParams> = async (req, res) => {
  const { id } = req.params;
  const updatedHeroData = req.body;
  try {
    const heroes = await readHeroesFromFile();
    const heroIndex = heroes.findIndex(h => h.id === id);
    if (heroIndex === -1) {
      return res.status(404).json({ message: "Hero not found" });
    }
    heroes[heroIndex] = { ...heroes[heroIndex], ...updatedHeroData };
    await writeHeroesToFile(heroes);
    res.json(heroes[heroIndex]);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteHeroById: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  try {
    const heroes = await readHeroesFromFile();
    const heroIndex = heroes.findIndex(h => h.id === id);
    if (heroIndex === -1) {
      return res.status(404).json({ message: "Hero not found" });
    }
    heroes.splice(heroIndex, 1);
    await writeHeroesToFile(heroes);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
};