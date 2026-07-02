export const log = (level, message, data = null) => {
  const logEntry = {
    time: new Date().toISOString(),
    level,
    message,
    data,
  };

  console.log(logEntry);
};