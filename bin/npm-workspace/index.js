#!/usr/bin/env node

import { input, confirm } from "@inquirer/prompts";
import { execSync } from "child_process";
import { program } from "commander";
import fs from "fs-extra";
import path from "path";
import { PackageTemplate } from "./lib/packageTemplate.js";
import { RootTemplate } from "./lib/rootTemplate.js";
import figlet from "figlet";
import {
  errorChalkLog,
  mutedChalkLog,
  successBlockChalkLog,
} from "./utils/chalkLogs.js";
import { installDependencies } from "./lib/installDependencies.js";

program
  .name("generator")
  .version("0.0.1")
  .option("-p, --project <string>", "Name of the project")
  .option("-a, --author <string>", "Author of the project")
  .parse(process.argv);

figlet("React-Dojo".split("").join(" "), async function (err, data) {
  if (err) {
    console.dir(errorChalkLog(err));
    return;
  }

  console.log("\n");
  console.log(mutedChalkLog(data));
  console.log("\n");

  const options = program.opts();

  const projectName =
    options?.project ??
    (await input({
      message: "Enter project name:",
    }));
  const authorName =
    options?.author ?? (await input({ message: "Enter author name:" }));

  async function createProject() {
    const projectPath = path.join(process.cwd(), projectName);

    // Create project directory
    await fs.ensureDir(projectPath);

    // Create basic structure
    const dirs = ["packages"];

    for (const dir of dirs) {
      // Ensures that the directory exists. If the directory structure does not exist, it is created.
      await fs.ensureDir(path.join(projectPath, dir));
    }

    // 1st package
    let package1 = "is-even";
    let package1Path = path.join(projectPath, "packages", package1);
    await new PackageTemplate(package1Path)
      .setProjectName(projectName)
      .setPackageName(package1)
      .setTemplate("template1")
      .create();

    // 2nd package
    let package2 = "is-odd";
    let package2Path = path.join(projectPath, "packages", package2);
    await new PackageTemplate(package2Path)
      .setProjectName(projectName)
      .setPackageName(package2)
      .setTemplate("template2")
      .setPackage1(package1)
      .create();

    // Root files
    await new RootTemplate(projectPath)
      .setProjectName(projectName)
      .setAuthorName(authorName)
      .setPackage1(package1)
      .create();

    console.log("\n");

    // Initialize git
    execSync("git init", { cwd: projectPath });

    console.log("\n");

    // Npm install
    const performNpmInstall = await confirm({
      message: "Do you want to install dependencies right now? ",
    });
    performNpmInstall && installDependencies(projectPath);

    console.log("\n");

    console.log(
      `${successBlockChalkLog(
        " Success "
      )} Project ${projectName} created successfully!`
    );

    console.log("\n");
  }

  createProject().catch(console.error);
});
