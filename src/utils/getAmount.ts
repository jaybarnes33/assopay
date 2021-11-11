export const getAmount = (level: number) => {
  switch (level) {
    case 100:
      return 50;

    case 200:
      return 30;
    case 300:
      return 30;
    case 400:
      return 30;
  }
};
