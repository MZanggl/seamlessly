const fs = require("fs");
const path = require("path");
const Env = use("Env");
const Route = use("Route");
const Helpers = use("Helpers")

module.exports = function generatedRoutes(options) {
  let { rcPath = "", actionsPath = path.join("app", "Actions") } = options
  rcPath = path.join(Helpers.appRoot(), rcPath, '.seamlesslyrc.json')
  actionsPath = path.join(Helpers.appRoot(), actionsPath)

  const generatedRoutes = [];
  const actionsDir = fs.readdirSync(actionsPath);

  actionsDir.forEach((file) => {
    const module = require(path.resolve(actionsPath, file));
    if (typeof module !== "object") {
      throw new Error(`${file} does not export individual functions.`);
    }

    for (let endpoint of Object.keys(module)) {
      if (typeof module[endpoint] !== "function") {
        console.log(`[${file}] skipping non-function [${endpoint}].`);
        continue;
      }

      generatedRoutes.push({
        file,
        endpoint,
        id: endpoint,
        method: "POST",
      });

      Route.post(`/api/${endpoint}`, async ({ request, response, auth }) => {
        try {
          const result = await module[endpoint].apply(
            { auth },
            request.input("args")
          );
          return response.json({ result });
        } catch (error) {
          console.log("error caught", error);
          return response.internalServerError();
        }
      });
    }
  });

  if (Env.get("NODE_ENV") !== "production") {
    const file = require(rcPath);

    file.generatedRoutes = generatedRoutes;
    fs.promises.writeFile(rcPath, JSON.stringify(file, null, 4));
  }
};
