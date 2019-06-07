this.importScripts('https://unpkg.com/serviceworkers-ware@0.3.2/dist/sww.js');

const worker = new this.ServiceWorkerWare();
const staticMocks = [];
const oneTimeMocks = [];

const createResponse = (mockData) => {
  const isString = typeof mockData.response === 'string';

  if (isString) {
    return new Response(mockData.response, {
      status: mockData.status,
      headers: {
        'Content-Type': 'text/plain',
        ...mockData.headers,
      },
    });
  }

  return new Response(JSON.stringify(mockData.response), {
    status: mockData.status,
    headers: {
      'Content-Type': 'application/json',
      ...mockData.headers,
    },
  });
};

const handleIncomingWorkerMessage = ({ data }) => {
  if (data.once) {
    oneTimeMocks.push(data);
  } else {
    staticMocks.push(data);
  }
};

const incomingRequestMiddleware = (req, res, endWith) => {
  const targetOnceTimeMockIdx = oneTimeMocks.findIndex(
    mock => mock.url === req.url && mock.method === req.method,
  );

  if (targetOnceTimeMockIdx !== -1) {
    const targetOnceTimeMock = oneTimeMocks[targetOnceTimeMockIdx];

    oneTimeMocks.splice(targetOnceTimeMockIdx, 1);

    return endWith(createResponse(targetOnceTimeMock));
  }

  const targetStaticMockIdx = staticMocks.findIndex(
    mock => mock.url === req.url && mock.method === req.method,
  );

  if (targetStaticMockIdx !== -1) {
    const targetMock = staticMocks[targetStaticMockIdx];

    return endWith(createResponse(targetMock));
  }

  return [req, res];
};

this.addEventListener('message', handleIncomingWorkerMessage);

worker.use(incomingRequestMiddleware);

worker.init();
