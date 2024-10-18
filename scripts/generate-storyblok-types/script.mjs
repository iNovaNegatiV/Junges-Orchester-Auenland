import { exec } from "child_process";
import { readdir } from "fs";

readdir("./migrations", (_err, files) => {
  files.forEach((fileName) => {
    console.log(
      `migrations/${fileName} => generated/${fileName.replace(
        ".json",
        ".d.ts"
      )}`
    );
    exec(
      `node node_modules/storyblok-generate-ts/dist/cli.js source=./migrations/${fileName} target=./generated/${fileName.replace(
        ".json",
        ""
      )}`,
      () => {}
    );
  });
});
