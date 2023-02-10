import fs from "fs";
import path from "path";

export const createFolder = async (
  name: string
): Promise<boolean | undefined> => {
  const route = `./users/${name}`;
  if (!fs.existsSync(route)) {
    try {
      await fs.mkdirSync(route);

      return true;
    } catch (e) {
      throw "Error" + e;
    }
  }
};
