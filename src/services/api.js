const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (signal) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid API response");
  }

  return data;
};