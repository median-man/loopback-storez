'use strict';

module.exports = function defineStoreRemoteMethods(Store) {
  const methodName = 'status';
  const options = {
    http: {
      path: '/status',
      verb: 'get',
    },
    returns: {
      arg: 'status',
      type: 'string',
    },
  };
  Store[methodName] = statusMessage;
  Store.remoteMethod(methodName, options);
};

function statusMessage() {
  const OPEN_MESSAGE = 'We are open for business.';
  const CLOSED_MESSAGE = 'Sorry, we are closed. Open daily from 6am to 8pm.';
  const response = isStoreOpen() ? OPEN_MESSAGE : CLOSED_MESSAGE;
  return Promise.resolve(response);
}

function isStoreOpen() {
  const currentHour = new Date().getHours();
  console.log(`Current hour is ${currentHour}`);

  const OPEN_HOUR = 6;
  const CLOSE_HOUR = 20;
  return currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR;
}
