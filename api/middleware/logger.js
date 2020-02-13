function logger(req, res, next){
    if(req){
    const { method, originalUrl } = req;
    let timestamp = new Date().toUTCString();
    console.log(`Request for ${ res.req.rawHeaders[0] }: ${ res.req.rawHeaders[1] }${originalUrl} on ${timestamp}, from ${ res.req.rawHeaders[4] }: ${ res.req.rawHeaders[5] } `,)
    next();
    } else { next(); }
};

module.exports = logger;