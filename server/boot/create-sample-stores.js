'use strict';
module.exports = function createSampleStores(app) {
  app.dataSources.mongoDS.automigrate(
    'store',
    err => err ? createStoresErr(err) : createStores(app)
  );
};

function createStoresErr(err) {
  throw err;
}

function createStores(app) {
  const sampleStores = [{
    name: 'Fireside Brews',
    city: 'Mammoth Lakes',
  }, {
    name: 'Cereal Farm',
    city: 'El Cajon',
  }, {
    name: 'Pies Galore',
    city: 'Lake Tahoe',
  }];
  app.models.store
    .destroyAll()
    .then(() => app.models.store.create(sampleStores))
    .then(logStores)
    .catch(console.error);
}

function logStores(stores) {
  console.log('Models created: \n', stores);
}
