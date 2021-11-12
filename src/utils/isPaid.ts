export const isPaid = (dues: Array<Record<string, string>>) => {
  let paid;
  dues?.forEach(item => {
    paid =
      item.year.trim() ===
      `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`;
    // paid =
  });
  return paid;
};
