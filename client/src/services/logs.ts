const base = "http://localhost:3000"

export const createLog = async (data: {description: string}) => {
  const response = await fetch(`${base}/logs`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create log");
  }
  return response.json();
};

export const listLog = async () => {
  const response = await fetch(`${base}/logs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch logs");
  }
  return response.json();
};
