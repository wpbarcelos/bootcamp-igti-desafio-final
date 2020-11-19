export default function moneyFormat(value) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
