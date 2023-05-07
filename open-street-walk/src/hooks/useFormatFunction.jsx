import { format } from "date-fns";

export const useFormatFunction = () => {
  const formatFunction = (time) => {
    const createdAt = new Date(time);
    const formattedCreatedAt = format(createdAt, "yyyy-MM-dd  HH:mm");
    return formattedCreatedAt;
  };
  return { formatFunction };
};
