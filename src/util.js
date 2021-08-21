const formatDate = (a) => {
  return `${a.getDate()}/${
    a.getMonth() + 1
  }/${a.getFullYear()} ${a.getHours()}:${
    a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes()
  }:${a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds()}`;
};

const formatData = (data) => {
  return {
    date: formatDate(data.timestamp),
    download: (data.download.bandwidth * 8) / 1000000,
    upload: (data.upload.bandwidth * 8) / 1000000,
    ping: data.ping.latency,
  };
};

const formatLog = (data, host) => {
  let log = `Host: ${host[0]} Date: ${data[0].date} Download: ${data[0].download} Upload: ${data[0].upload} Ping: ${data[0].ping}`;

  if (host[1]) {
    log += "\n";
    log += `Host: ${host[1]} Date: ${data[1].date} Download: ${data[1].download} Upload: ${data[1].upload} Ping: ${data[1].ping}`;
  }
  console.log(log);
};

module.exports = {
  formatData,
  formatLog,
};
