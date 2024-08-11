import { GIT_IGNORE } from "../data/gitIgnore.js";
import { PACKAGE_NXPROJECTJSON } from "../data/package_NxConfigJson.js";
import { PACKAGE_PACKAGEJSON } from "../data/package_PackageJson.js";
import { package_Template1 } from "../data/package_template1.js";
import { package_Template2 } from "../data/package_Template2.js";
import { PACKAGE_TSCONFIGJSON } from "../data/package_TsConfigJson.js";
import { package_ViteConfig } from "../data/package_ViteConfig.js";
import { FileOps } from "./fileCreator.js";

export class PackageTemplate extends FileOps {
  constructor(packagePath) {
    super(packagePath);

    this.packageName = undefined;
    this.projectName = undefined;
    /**
     * @type {"template1" | "template2" | undefined}
     */
    this.template = undefined;
  }

  /**
   *
   * @param {typeof this.template} template
   * @returns
   */
  setTemplate(template) {
    this.template = template;
    return this;
  }

  setPackageName(packageName) {
    this.packageName = packageName;
    return this;
  }

  setProjectName(projectName) {
    this.projectName = projectName;
    return this;
  }

  async createPackageJson() {
    if (!this.packageName || !this.projectName) {
      throw new Error(
        "Make sure you set packageName and projectName using the methods setPackageName and setProjectName respectively"
      );
    }

    let fileName = "package.json";
    let content = {
      name: `@${this.projectName}/${this.packageName}`,
      ...PACKAGE_PACKAGEJSON,
    };
    await this.createJsonFile(fileName, content);
  }

  async createTsConfigJson() {
    let fileName = "tsconfig.json";
    let content = { ...PACKAGE_TSCONFIGJSON };

    await this.createJsonFile(fileName, content);
  }

  async createNxProjectJson() {
    let fileName = "project.json";
    let content = { ...PACKAGE_NXPROJECTJSON };

    await this.createJsonFile(fileName, content);
  }

  async createViteConfig() {
    let fileName = "vite.config.ts";
    let content = package_ViteConfig;
    await this.createFile(fileName, content);
  }

  async createGitIgnore() {
    let fileName = ".gitignore";
    let content = GIT_IGNORE;
    await this.createFile(fileName, content);
  }

  async createTemplateFiles() {
    switch (this.template) {
      case "template1": {
        let index = "index.ts";
        let indexContent = package_Template1;
        await this.createFile(index, indexContent);

        let libIndex = "lib/index.ts";
        let libIndexContent = "";
        await this.createFile(libIndex, "");

        break;
      }

      case "template2": {
        let index = "index.ts";
        let indexContent = package_Template2;
        await this.createFile(index, indexContent);

        let libIndex = "lib/index.ts";
        let libIndexContent = "";
        await this.createFile(libIndex, "");

        break;
      }

      default: {
        let fileName = "index.ts";
        let content = "";
        await this.createFile(fileName, content);

        break;
      }
    }
  }

  async create() {
    if (!this.packageName || !this.packagePath || !this.projectName) {
      throw new Error(
        "Make sure you set packageName, projectName and projectPath using the methods setPackageName, setProjectName and setProjectPath respectively"
      );
    }

    // Create .gitignore
    await this.createGitIgnore();
    // Create package.json
    await this.createPackageJson();
    // Create tsconfig.json
    await this.createTsConfigJson();
    // Create vite.config.ts
    await this.createViteConfig();
    // Create project.json (for nx)
    await this.createNxProjectJson();
    // Create template files
    await this.createTemplateFiles();
  }
}
