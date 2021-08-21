## Simple CLI to test out your network speed with up to 2 hosts.

- Hosts:

  - colombia
  - mexico
  - usa
  - germany
  - japan

```shell
 Options:
  -V, --version          output the version number
  -r  , --runs  <runs>   amount of runs (default: 1)
  -t  , --time  <time>   time between runs (default: 0)
  -H1 , --host1 <host1>  host1 to connect to (default: "usa")
  -H2 , --host2 <host2>  host2 to connect to (default: "")
  -w  , --watch          Watch for changes and export data to xlxs file (default: false)
  -s  , --seconds        set time unit to seconds, default: minutes (default: false)
  -h, --help             display help for command
```

> Based on https://github.com/ddsol/speedtest.net

> Servers taken from: https://williamyaps.github.io/wlmjavascript/servercli.html

### Usage:

```shell
netspeed -r 2 -w -s -t 50 -H1 usa -H2 japan
```

    It will output two files in this case.
    They will be placed into your cwd.
