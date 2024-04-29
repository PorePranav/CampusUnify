import { format } from "date-fns";

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

export const formatDate = (value) => {
  return format(new Date(value), "dd MMM yyy");
};
