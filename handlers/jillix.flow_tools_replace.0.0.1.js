Flow.set("jillix.flow_tools_replace.0.0.1",(()=>{
"use strict";

return (event, args, state, data, resolve, reject) => {

    const search = (data && data.search) || (args && args.search);
    if (typeof search !== "string") {
        return reject(new Error("Flow-tools.replace: Missing search string."));
    }

    let regexp = (data && data.regexp) || (args && args.regexp);
    if (!regexp) {
        return reject(new Error("Flow-tools.replace: Missing regular expression."));
    }
    regexp = new RegExp(regexp);

    const replace = (data && data.replace) || (args && args.replace);
    if (!replace) {
        return reject(new Error("Flow-tools.replace: Missing replace string."));
    }

    data.replaced = search.replace(regexp, replace);
    resolve(data);
};
})());
