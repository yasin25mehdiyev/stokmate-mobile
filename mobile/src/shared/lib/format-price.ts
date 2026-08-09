const priceFormatter = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatPrice = (coin: number): string => {
  return `${priceFormatter.format(coin / 100)} ₺`;
};

export { formatPrice };
