import bs58 from '@/bs58';
import keystoreKeyGen from '@/keystoreKeyGen';

import { password, v3Child } from 'fixtures/keystore';

describe('keystoreKeyGen', () => {
  it('should return public key', () => {
    const publicKey = keystoreKeyGen.getPublicKey(password, v3Child);

    expect(bs58.encodeBase58(publicKey)).toBe(
      'HuS6hKxvhzjqZUr8yecCwX6MyGXp2f5Z9RGRKzv7BP6bEU1YWVeZrUBdyGkVCgWKqRzcumkWsq3yXJP8QsfpxJmEb8mTR',
    );
  });

  it('should return public key', () => {
    const privateKey = keystoreKeyGen.getPrivateKey(password, v3Child);

    expect(bs58.encodeBase58(privateKey)).toBe(
      '47BNQ5wzcxJzWbZcuoX7CtjRwRUkpJQoPhLqEYfWuZrrEsHdb',
    );
  });
});
