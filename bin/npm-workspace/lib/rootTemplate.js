import { GIT_IGNORE } from "../data/gitIgnore.js";
import { NX_CONFIGJSON } from "../data/nxConfigJson.js";
import { ROOT_PACKAGEJSON } from "../data/root_PackageJson.js";
import { TS_CONFIGBASEJSON } from "../data/tsConfigBaseJson.js";
import { FileOps } from "./fileCreator.js";

export class RootTemplate extends FileOps {
  constructor(rootPath) {
    super(rootPath);

    this.projectName = undefined;
    this.authorName = "";
    this.package1 = "";
  }

  setProjectName(projectName) {
    this.projectName = projectName;
    return this;
  }

  setAuthorName(authorName) {
    this.authorName = authorName;
    return this;
  }

  setPackage1(package1) {
    this.package1 = package1;
    return this;
  }

  async createPackageJson() {
    if (!this.projectName) {
      throw new Error(
        "Make sure you set packageName and projectName using the methods setPackageName and setProjectName respectively"
      );
    }

    let fileName = "package.json";
    let content = {
      name: `${this.projectName}`,
      author: {
        name: this.authorName,
        url: `https://github.com/${this.authorName}`,
      },
      ...ROOT_PACKAGEJSON,
    };
    await this.createJsonFile(fileName, content);
  }

  async createNxJson() {
    let fileName = "nx.json";
    let content = { ...NX_CONFIGJSON };
    await this.createJsonFile(fileName, content);
  }

  async createTsConfigJson() {
    let fileName = "tsconfig.base.json";
    let content = TS_CONFIGBASEJSON(this.projectName, this.package1);
    await this.createJsonFile(fileName, content);
  }

  async createGitIgnore() {
    let fileName = ".gitignore";
    let content = GIT_IGNORE;
    await this.createFile(fileName, content);
  }

  async create() {
    if (!this.projectName) {
      throw new Error(
        "Make sure you set packageName, projectName and projectPath using the methods setPackageName, setProjectName and setProjectPath respectively"
      );
    }

    // Create .gitignore
    await this.createGitIgnore();
    // Create package.json
    await this.createPackageJson();
    // Create nx.json
    await this.createNxJson();
    // Create tsconfig.base.json
    await this.createTsConfigJson();
  }
}
