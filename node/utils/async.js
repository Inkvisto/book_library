export const asyncify = (fn) => (...args) => {
  const callback = args.pop();
  setTimeout(() => {
    let result;
    try {
      result = fn(...args);
    } catch (error) {
      callback(error);
      return;
    }
    callback(null, result);
  }, 0);
};

export const promisify = (fn) => (...args) => new Promise(
  (resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  }
);

export const __delay__ = (timer) => {
  return new Promise(resolve => {
    timer = timer || 1000;
    setTimeout(() => resolve(), timer);
  });
};