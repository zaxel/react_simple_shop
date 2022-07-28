﻿export const formatUsCurrency = (price = 0) => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return formatter.format(price)
}