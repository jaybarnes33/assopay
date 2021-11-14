export const getAmount = (level: number) => {
  switch (level) {
    case 100:
      return 52;

    case 200:
    case 300:
    case 400:
      return 32;

    default:
      return 0;
  }
};
