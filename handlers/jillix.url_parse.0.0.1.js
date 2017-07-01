Flow.set("jillix.url_parse.0.0.1",(()=>{
/*{
    "input": {
        "data": {
            "url": "<URL>"
        }
    },
    "output": {
        "data": {
            "parsed_url": "<URLparsed>"
        }
    }
}*/
"use strict";

return (event, args, state, data, resolve, reject) => {

    if (!data || typeof data.url !== "string") {
        return reject(new Error("URL parse: Missing url."));
    }

    const parsed = {};

    // protocol
    parsed.path = data.url.split("://");
    parsed.protocol = parsed.path[0];
    parsed.path = parsed.path[1];

    // hostname
    let pathStart = parsed.path.indexOf("/");
    parsed.host = parsed.path.substr(0, pathStart);
    parsed.path = parsed.path.substr(pathStart);

    // port
    if (parsed.host.indexOf(":") > 1) {
        parsed.host = parsed.host.split(":");
        parsed.port = parsed.host[1];
        parsed.host = parsed.host[0];
    }

    // query
    parsed.path = parsed.path.split("?");
    parsed.query = parsed.path[1] || "";
    parsed.path = parsed.path[0];

    // hash
    if (parsed.query.indexOf("#") > 0) {
        parsed.hash = parsed.query.split("#");
        parsed.query = parsed.hash[0];
        parsed.hash = parsed.hash[1];
    } else if (data.url.indexOf("#") > 0) {
        parsed.hash = parsed.path.split("#");
        parsed.path = parsed.hash[0];
        parsed.hash = parsed.hash[1];
    }

    data.parsed_url = parsed;
    resolve(data);
};

})());
