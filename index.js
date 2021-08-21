#!/usr/bin/env node
const program = require("commander");
const runner = require("./src/runner");

program
  .version("1.0.0")
  .description(
    `
  To test out your network speed with up to 2 hosts.

  Hosts:
  - colombia
  - mexico
  - usa
  - germany
  - japan`
  )
  .name("netspeed")
  .usage("[options]");
program.option("-r  , --runs  <runs>", "amount of runs", 1);
program.option("-t  , --time  <time>", "time between runs", 0);
program.option("-H1 , --host1 <host1>", "host1 to connect to", "usa");
program.option("-H2 , --host2 <host2>", "host2 to connect to", "");
program.option(
  "-w  , --watch",
  "Watch for changes and export data to xlxs file",
  false
);
program
  .option(
    "-s  , --seconds",
    "set time unit to seconds, default: minutes",
    false
  )
  .parse();

const { runs, time, host1, host2, watch, seconds } = program.opts();

runner(parseInt(runs), parseInt(time), host1, host2, watch, seconds);
