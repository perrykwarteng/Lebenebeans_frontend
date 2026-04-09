export const formatCurrency = (value?: number) => {
  if (!value) return "Ghc0.00";

  return `Ghc${value.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
