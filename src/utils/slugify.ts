export const slugify = (text: string) =>
  text.toLowerCase().replaceAll(" ", "-");
