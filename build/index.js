const packageJson = require("package.json")
    , packages = require("./packages")
    , sameTime = require("same-time")
    , bindy = require("bindy")
    , log = require("bug-killer").log
    , writeJson = require("w-json")
    ;

sameTime(bindy(packages, (repoUrl, cb) => {
    packageJson(repoUrl, (err, data) => {
        log(`Fetched ${repoUrl}.`);
        err && log(err);
        cb(err, data);
    });
}), (err, data) => {
    if (err) {
        return log(err);
    }
    writeJson(`${__dirname}/../lib/packages.json`, data, err => log(err || "Done."));
});
