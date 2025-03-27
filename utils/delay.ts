export const delay = (max = 1000000) => {
  const randomDelayTime = Math.floor(Math.random() * (max - 500 + 1));
  return new Promise((resolve) => setTimeout(resolve, randomDelayTime));
};
