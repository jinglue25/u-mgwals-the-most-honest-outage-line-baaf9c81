import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line = "Status: all servers are down. We are as surprised as you are, because the dashboard said this was impossible, and the dashboard is also down.";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = `${outputDir}/entry.txt`;

try {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(entryPath, `${line}\n`, "utf8");
} catch (cause) {
  throw new Error(`Failed to write entry from ${import.meta.url}`, { cause });
}

const characterCount = readFileSync(entryPath, "utf8").trim().length;
if (characterCount === 0 || characterCount > 160) {
  throw new Error(
    `Entry must contain 1–160 characters after trimming; found ${characterCount} in ${entryPath}.`,
  );
}
