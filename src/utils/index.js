const bigLog = (word) => {
  console.log(`%c${word}`, 'font-size:56px');
};

const log = (...args) => {
  Function.prototype.apply.call(console.log, console, args);
};

export default {
  bigLog,
  log,
};
