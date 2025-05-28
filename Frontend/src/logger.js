// logger.js
export const logger = {
    log: (...args) => {
      if (typeof window !== 'undefined') {
        // Client-side logging
        console.log(...args);
      } else {
        // Server-side logging
        console.log(...args);
      }
    },
    error: (...args) => {
      if (typeof window !== 'undefined') {
        // Client-side error logging
        console.error(...args);
      } else {
        // Server-side error logging
        console.error(...args);
      }
    },
  };