import axios from "axios";

export async function getEvents() {
  const { data, error } = await axios.get(
    "http://localhost:3000/api/v1/events/",
    { withCredentials: true },
  );

  if (error) return new Error(error.message);
  return data.data;
}
