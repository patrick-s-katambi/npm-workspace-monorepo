import ora from "ora";
import { exec } from "child_process";
import util from "util";

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
    }
  } catch (error) {
    spinner.fail("Error during installation");
    console.error(error);
  }
}
