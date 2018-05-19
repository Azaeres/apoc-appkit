export default function delay(duration) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, duration);
    } catch (e) {
      reject(e);
    }
  });
}
