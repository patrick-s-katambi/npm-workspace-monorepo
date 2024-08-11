import ora from "ora";
import { exec } from "child_process";
import util from "util";
import {
  successBlockChalkLog,
  mutedChalkLog,
  successChalkLog,
} from "../utils/chalkLogs";

const execPromise = util.promisify(exec);

export async function installDependencies(projectPath) {
  const spinner = ora("Installing dependencies").start();

  try {
    const { stdout, stderr } = await execPromise(
      "npm install --legacy-peer-deps",
      { cwd: projectPath }
    );

    if (stderr) {
      spinner.fail("Error during installation");
      console.error(stderr);
    } else {
      spinner.succeed("Dependencies installed successfully");

      console.log("\n");

      console.log(
        `${successBlockChalkLog(
          " Success "
        )} Project '${projectName}' is created successfully! 😎`
      );

      console.log(mutedChalkLog("Next steps:\n"));
      console.log(`\t1. ${successChalkLog(`cd ${projectName}`)}\n`);
      console.log(`\t2. Pray!\n`);
      console.log(`\t3. You know the rest! Happy coding 🤙\n`);
    }
  } catch (error) {
    spinner.fail("Error during installation");
    console.error(error);
  }
}
