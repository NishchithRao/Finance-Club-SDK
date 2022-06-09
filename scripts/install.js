const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const basePath = process.cwd();

const packageFolder = path.join(basePath, "packages");

const packages = fs.readdirSync(packageFolder);

const checkIfDireactory = (folderName) =>
  fs.statSync(path.join(packageFolder, folderName)).isDirectory();

packages.forEach((packageName) => {
  if (checkIfDireactory(packageName)) {
    process.chdir(path.join(packageFolder, packageName));
    execSync("npm install");
  }
});
