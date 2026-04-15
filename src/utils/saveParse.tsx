export const safeParse = (value: string | null) => {
  if (!value || value === "undefined") return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
