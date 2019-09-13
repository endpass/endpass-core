import generators from '@/generators';

describe('generators', () => {
  it('should sleep timer', async () => {
    expect.assertions(1);

    const data = { result: 'result' };
    const result = await generators.sleep(10, data);

    expect(data).toEqual(result);
  });

  it('should iterate with timeout interval', async () => {
    expect.assertions(11);

    let count = 0;
    for await (const index of generators.repeatWithInterval(10)) {
      expect(index).toBe(count);
      count += 1;
      if (count >= 10) {
        break;
      }
    }

    expect(count).toBe(10);
  });
});
