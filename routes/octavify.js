import fs from "fs";
import path from "path";
import { findLeft } from "../utils/findLeft.js";

const LOOKUP_FILE_PATH = path.resolve("./data/offset_map.json");
const LOOKUP = JSON.parse(fs.readFileSync(LOOKUP_FILE_PATH, "utf8"));

const handler = (req, res) => {
  try {
    const { body: docs } = req;
    const converted = docs.map((doc) => {
      const { id, offsets } = doc;
      const offsetMap = LOOKUP[id];
      if (!offsetMap) {
        return doc;
      }
      const milestones = offsetMap[0];
      const adjustments = offsetMap[1];
      const octavoOffsets = offsets.map((offset) => {
        const adjustmentIndex = findLeft(milestones, offset);
        const shift = adjustmentIndex === -1 ? 0 : adjustments[adjustmentIndex];
        return offset + shift;
      });
      return {
        id,
        offsets: octavoOffsets,
      };
    });
    res.json(converted);
  } catch (error) {
    console.log(error);
  }
};

export { handler as octavify };
