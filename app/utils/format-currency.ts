interface FormatCurrencyProps {
  amount: number;
  currency: "USD" | "EUR";
}

export const formatCurrency = ({ amount, currency }: FormatCurrencyProps) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};
