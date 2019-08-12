global.flushPromises = () => new Promise(resolve => setImmediate(resolve));
