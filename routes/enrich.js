import fs from "fs";
import path from "path";

const LOOKUP_FILE_PATH = path.resolve("./data/metadata_map.json");
const LOOKUP = JSON.parse(fs.readFileSync(LOOKUP_FILE_PATH, "utf8"));

const handler = (req, res) => {
  try {
    const { body: docIds } = req;
    console.log(docIds);
    const resultMap = docIds.reduce((map, docId) => {
      map[docId] = LOOKUP[docId] || {};
      return map;
    }, {});
    res.json(resultMap);
  } catch (error) {
    console.log(error);
  }
};

export { handler as enrich };
