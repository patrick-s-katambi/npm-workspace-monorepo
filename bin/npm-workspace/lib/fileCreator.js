import fs from "fs-extra";
import path from "path";
import {
  mutedChalkLog,
  successBlockChalkLog,
  successChalkLog,
} from "../utils/chalkLogs.js";

export class FileOps {
  constructor(packagePath) {
    this.packagePath = packagePath;
  }

  async getPackageRoot() {
    if (!this.packagePath) {
      throw new Error("Make sure you set packagePath");
    }

    await fs.ensureDir(path.join(this.packagePath));

    return this.packagePath;
  }

  async createFile(fileName, content = ``) {
    if (!fileName) {
      throw new Error("Make sure you pass fileName argument");
    }

    let packageRoot = await this.getPackageRoot();

    let fileNameSplit = fileName.split("/");
    let _nestedFileName = fileNameSplit.length > 1 ? fileNameSplit : undefined;
    _nestedFileName &&
      (await fs.ensureFile(path.join(packageRoot, ..._nestedFileName)));

    if (_nestedFileName)
      await fs.writeFile(path.join(packageRoot, ...fileNameSplit), content);
    else await fs.writeFile(path.join(packageRoot, fileName), content);

    console.log(
      `${successChalkLog("->")} ${mutedChalkLog(
        `CREATED a file at `
      )} ${successChalkLog(fileName)}`
    );
  }

  async createJsonFile(fileName, content = {}) {
    if (!fileName) {
      throw new Error("Make sure you pass fileName argument");
    }
    let projectRoot = await this.getPackageRoot();

    await fs.ensureFile(path.join(projectRoot, fileName));

    await fs.writeJSON(
      path.join(projectRoot, fileName),
      { ...content },
      { spaces: 2 }
    );

    console.log(
      `${successChalkLog("->")} ${mutedChalkLog(
        `CREATED a file at `
      )} ${successChalkLog(fileName)}`
    );
  }
}
