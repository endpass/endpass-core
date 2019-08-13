import E2EBridge from '@/E2EBridge';

describe('E2EBridge', () => {
  const e2eBridge = new E2EBridge();
  describe('create wildcard url', () => {
    it('should work in correct flow', () => {
      const orders = [];
      const pushOrders = list => index => {
        list.push(index);
      };
      const fn = pushOrders(orders);
      const handler1 = fn(1);
      const handler2 = fn(2);
      const handler3 = fn(3);

      e2eBridge.awaitClientPaused().then(handler1);
      e2eBridge.awaitClientResume().then(handler2);
      e2eBridge.resumeClient();

      // for widget call
      e2eBridge.awaitClientResume().then(handler3);
      expect(orders).toEqual([1, 2, 3]);
    });
  });
});
