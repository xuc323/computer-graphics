const { build } = require("esbuild");

build({
  entryPoints: ["./server.ts"],
  bundle: true,
  platform: "node",
  outdir: "dist",
  minify: true,
}).then(() => console.log("⚡ Bundle is complete! ⚡"));
