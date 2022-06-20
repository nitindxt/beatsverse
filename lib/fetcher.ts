export default function fetcher(
  url: string,
  data?: { email: string; password: string }
) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include", // ensures we get the cookie for jwt
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });
}
