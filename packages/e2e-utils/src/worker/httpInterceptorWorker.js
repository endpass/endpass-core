this.importScripts(
  'https://unpkg.com/@endpass/e2e-utils@0.2.2/SWMessagesMethods.js',
);
this.importScripts('https://unpkg.com/dexie@2.0.4/dist/dexie.min.js');
this.importScripts('https://unpkg.com/serviceworkers-ware@0.3.2/dist/sww.js');

/**
 * DB initialization
 */
const db = new this.Dexie('routes_mocks_db');

db.version(1).stores({
  static: 'id,url,method,headers,response',
  once: 'id,url,method,headers,response',
});

const wrapRoutesDBTable = table => ({
  save: route => db[table].add(route),

  remove: id => db[table].delete(id),

  find: ({ url, method }) => db[table].get({ url, method }),

  clear: () => db[table].clear(),
});
const staticRouteTable = wrapRoutesDBTable('static');
const onceRouteTable = wrapRoutesDBTable('once');

/**
 * Worker preparings
 */
const worker = new this.ServiceWorkerWare();

const createResponse = mockData => {
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

const handleIncomingWorkerMessage = async ({ data }) => {
  switch (data.method) {
    case this.SWMessagesMethods.MOCK_ONCE:
      await onceRouteTable.save(data);
      break;
    case this.SWMessagesMethods.MOCK:
      await staticRouteTable.save(data);
      break;
    case this.SWMessagesMethods.CLEAR_ALL_MOCKS:
      await staticRouteTable.clear();
      await onceRouteTable.clear();
      break;
    default:
      break;
  }
};
const fetchMiddleware = async (req, res, endWith) => {
  const onceRouteMock = await onceRouteTable.find({
    url: req.url,
    method: req.method,
  });

  if (onceRouteMock) {
    await onceRouteTable.remove(onceRouteMock.id);

    return endWith(createResponse(onceRouteMock));
  }

  const staticRouteMock = await staticRouteTable.find({
    url: req.url,
    method: req.method,
  });

  if (staticRouteMock) {
    return endWith(createResponse(staticRouteMock));
  }

  return [req, res];
};

/**
 * Worker initialization
 */
this.addEventListener('message', handleIncomingWorkerMessage);
worker.use(fetchMiddleware);
worker.init();
