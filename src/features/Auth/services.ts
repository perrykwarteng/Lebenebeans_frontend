import axios from "axios";

export const verify = async (ref: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/orders/verify/${ref}`,
  );
  return res.data.data || null;
};
