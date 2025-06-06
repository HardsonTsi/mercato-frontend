export function setAuthHeader(
  headers: Headers,
  getState: () => unknown,
): Headers {
  const token = (getState() as any)?.auth?.token;

  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  headers.set('Accept', 'application/json');

  return headers;
}
