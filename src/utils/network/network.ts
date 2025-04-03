type Config = {
  path: string;
  method: string;
  body: string;
};
export const request = async (config: Config, publicKey: string) => {
  const { path, body } = config;
  const response = await fetch(`https://api.sandbox.checkout.com/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicKey}`,
    },
    body,
  });

  const data = await response.json();
  return data;
};
