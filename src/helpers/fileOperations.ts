import fs from "fs";
import path from "path";
import { Hero } from "../types/Hero";
// import { Hero } from "../types/hero";

const filePath = path.join(__dirname, "../data/heroes.json");

export const readHeroesFromFile = async (): Promise<Hero[]> => {
  const data = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(data);
};

export const writeHeroesToFile = async (heroes: Hero[]): Promise<void> => {
  await fs.promises.writeFile(filePath, JSON.stringify(heroes, null, 2));
};
