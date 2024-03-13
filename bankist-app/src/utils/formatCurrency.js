export default function formatCurrency(account, value) {
  return new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(value);
}
