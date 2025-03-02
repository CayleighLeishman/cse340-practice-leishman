const flashMessages = (req, res, next) => {
    if (!req.session) {
        throw new Error("Flash middleware requires session support. Use `express-session`.");
    }
 
    // Initialize flash storage
    req.session.flash = req.session.flash || [];
 
    // Define `req.flash` to add messages
    req.flash = (type, message) => {
        req.session.flash.push({ type, message });
    };
 
    // Move flash messages to `res.locals.flash` for immediate use
    res.locals.flash = [...req.session.flash];
 
    // Clear flash messages after they have been retrieved
    req.session.flash = [];
 
    next();
};
 
export default flashMessages;