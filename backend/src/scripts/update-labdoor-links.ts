import axios from "axios";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import * as fs from "fs";
import * as path from "path";

const csvFilePath = path.resolve(__dirname, "labdoor.csv");
const outputFilePath = path.resolve(__dirname, "labdoor-updated.csv");

const processCsv = async () => {
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

  const parser = parse({
    delimiter: ",",
    columns: true,
  });

  const records = [];
  parser.write(fileContent);
  parser.end();

  for await (const record of parser) {
    records.push(record);
  }

  for (const record of records) {
    for (const key in record) {
      if (record[key].startsWith("https://labdoor.com/review/")) {
        try {
          const response = await axios.get(record[key], {
            maxRedirects: 0,
            validateStatus: (status) => status === 302 || status === 200,
          });

          if (response.status === 302 && response.headers.location) {
            console.log(`Redirecting ${record[key]} to ${response.headers.location}`);
            record[key] = response.headers.location;
          }
        } catch (error) {
          console.error(`Error fetching ${record[key]}:`, error.message);
        }
      }
    }
  }

  const stringifier = stringify({
    header: true,
    columns: Object.keys(records[0]),
  });

  const writableStream = fs.createWriteStream(outputFilePath);
  stringifier.pipe(writableStream);

  records.forEach((record) => {
    stringifier.write(record);
  });

  stringifier.end();

  console.log(`Processing complete. Updated CSV saved to ${outputFilePath}`);
};

processCsv();
