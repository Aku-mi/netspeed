const excel = require("excel4node");

const fs = require("fs");
const path = require("path");

class Generator {
  constructor() {
    this.count = 0;
    this.data = [];
    this.workbook = new excel.Workbook();
    this.worksheet = this.workbook.addWorksheet("Sheet 1");
    this.style = this.workbook.createStyle({
      font: {
        color: "#000000",
        size: 12,
      },
    });
  }

  headers() {
    this.worksheet.cell(1, 1).string("date").style(this.style);
    this.worksheet.cell(1, 2).string("download (mb/s)").style(this.style);
    this.worksheet.cell(1, 3).string("upload (mb/s)").style(this.style);
    this.worksheet.cell(1, 4).string("ping (ms)").style(this.style);
  }

  append(result) {
    this.data.push(result);

    this.data.map((d, i) => {
      this.worksheet.cell(i + 2, 1).string(d.date);

      this.worksheet.cell(i + 2, 2).number(d.download);

      this.worksheet.cell(i + 2, 3).number(d.upload);

      this.worksheet.cell(i + 2, 4).number(d.ping);
    });
  }

  generate(h) {
    this.headers();
    this.workbook.write(`data${h + this.count}.xlsx`, (err, _) => {
      if (err) {
        console.log(
          err.code === "EBUSY"
            ? "Main File is open or busy, generating a new one"
            : err
        );
        this.count++;
        this.workbook.write("data" + h + this.count + ".xlsx");
      }
    });
  }
}

module.exports = Generator;
