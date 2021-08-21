const speedTest = require("speedtest-net");
const hosts = require("./host");
const Generator = require("./excelgen");
const { formatData, formatLog } = require("./util");

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const test = async (h) => {
  if (h) {
    const result = await speedTest({
      acceptLicense: true,
      host: hosts[h],
    });
    return result;
  }
  return null;
};

const getData = async (h1, h2) => {
  let d1 = undefined;
  let d2 = undefined;
  await Promise.all([test(h1), test(h2)]).then((v) => {
    d1 = v[0];
    d2 = v[1];
  });

  const data1 = formatData(d1);

  if (d2) {
    const data2 = formatData(d2);
    return [data1, data2];
  }

  return [data1];
};

const runner = async (runs, time, host1, host2, watch, seconds) => {
  const g1 = new Generator();
  const g2 = new Generator();

  for (let i = 0; i < runs; i++) {
    try {
      console.log("testing...");
      const data = await getData(host1, host2);
      formatLog(data, [host1, host2]);
      if (watch) {
        console.log("writting...");
        g1.append(data[0]);
        g1.generate(host1);
        if (data[1]) {
          g2.append(data[1]);
          g2.generate(host2);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
    await timeout(seconds ? time * 1000 : time * 60000);
  }
};

module.exports = runner;
