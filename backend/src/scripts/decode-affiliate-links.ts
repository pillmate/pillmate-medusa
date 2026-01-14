import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import * as fs from "fs";
import * as path from "path";

const csvFilePath = path.resolve(__dirname, "labdoor-updated.csv");
const outputFilePath = path.resolve(__dirname, "labdoor-final.csv");

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
      const value = record[key];
      if (value) {
        if (value.startsWith("http")) {
          try {
            const decodedUrl = decodeURIComponent(value);
            let cleanUrl = decodedUrl.split("destination:").pop();
            cleanUrl = cleanUrl.substring(cleanUrl.indexOf("=http") + 1);
            cleanUrl = cleanUrl.split("?")[0].split("&")[0].split("/ref=")[0];
            cleanUrl = cleanUrl.replace("http://", "https://");
            console.log(`Cleaning ${value} to ${cleanUrl}`);
            record[key] = cleanUrl;
          } catch (error) {
            console.error(`Error cleaning ${value}:`, error.message);
          }
        }
      }
    }
  }

  if (records.length === 0) {
    console.log("No records to process.");
    return;
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

  console.log(`Processing complete. Decoded CSV saved to ${outputFilePath}`);
};

processCsv();
