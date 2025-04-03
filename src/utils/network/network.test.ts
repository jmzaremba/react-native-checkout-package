import { request } from './network';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('request', () => {
  const publicKey = 'pk_test_123';
  const config = {
    path: 'tokens',
    method: 'POST',
    body: JSON.stringify({ foo: 'bar' }),
  };

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('SHOULD send POST request with headers and body', async () => {
    const mockResponse = { token: 'tok_abc123' };
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await request(config, publicKey);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.sandbox.checkout.com/tokens',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicKey}`,
        },
        body: config.body,
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it('SHOULD return parsed JSON from response', async () => {
    const mockData = { id: 'test123' };
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const data = await request(config, publicKey);
    expect(data).toStrictEqual(mockData);
  });

  it('SHOULD throw error if fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(request(config, publicKey)).rejects.toThrow('Network error');
  });

  it('SHOULD throw if to json errors', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
    });

    await expect(request(config, publicKey)).rejects.toThrow('Invalid JSON');
  });
});
