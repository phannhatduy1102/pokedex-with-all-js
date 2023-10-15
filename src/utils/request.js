export const fetchData = async ({
  url = "",
  method = "GET",
  headers = {},
  data = {},
  onSuccess,
  onFailed,
  ...rest
}) => {
  try {
    const response = await fetch(url, {
      method: method,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method === "GET" ? undefined : JSON.stringify(data),
      ...rest,
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error(error);
  }
};
