const sessions = {};

module.exports = {
  start: (sessionId, cb) => {
    sessions[sessionId] = {};
    cb();
  },
  end: (sessionId, cb) => {
    delete sessions[sessionId];
    cb();
  },
  set: (sessionId, key, val, cb) => {
    sessions[sessionId][key] = val;
    cb();
  },
  get: (sessionId, key, cb) => {
    cb(null, sessions[sessionId][key]);
  }
};
