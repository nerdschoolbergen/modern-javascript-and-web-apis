'use strict';

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

const createId = () => `${s4()}`;

module.exports = createId;
