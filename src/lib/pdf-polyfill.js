// This file tricks Vercel's server into thinking it has browser capabilities
if (typeof global !== 'undefined' && typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class DOMMatrix {
    constructor() {}
  };
}

module.exports = {};
