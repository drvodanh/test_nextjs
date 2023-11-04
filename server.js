var conjugator = require("./korean/conjugator");

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname.startsWith("/conjugate=")) {
        const encodedTerm = pathname.replace("/conjugate=", "");
        const term = decodeURIComponent(encodedTerm); // Giải mã URL

        let regular = true;
        let conjugations;

        for (irregular_name in conjugator.verb_types) {
          let func = conjugator.verb_types[irregular_name];
          if (func(conjugator.base(term))) {
            regular = false;
            break;
          }
        }

        conjugator.conjugate(term, regular, function (result) {
          conjugations = result;
          const jsonConjugations = JSON.stringify(conjugations);
          res.setHeader("Content-Type", "application/json");
          res.end(jsonConjugations);
        });
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error: " + err.message);
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
