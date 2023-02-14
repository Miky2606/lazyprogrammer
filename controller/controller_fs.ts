import fs from "fs";
import path from "path";

export const createFolder = async (
  name: string
): Promise<boolean | undefined> => {
  const route = `./users/${name}`;
  try {
    if (!fs.existsSync("./users")) {
      await fs.mkdirSync("./users");
    }
    if (!fs.existsSync(route)) {
      await fs.mkdirSync(route);

      return true;
    }
  } catch (e) {
    throw "Error" + e;
  }
};
