/**
 * Registers service worker from given url and resolves it
 * If worker can't be resolved – resolves with null
 * @param {string} url Service worker script url
 * @returns {Promise<ServiceWorker|null>} Active service worker or null
 */
export function getServiceWorkerWithActivation(url) {
  /* eslint-disable-next-line consistent-return */
  return new Promise(async (resolve) => {
    if (!navigator.serviceWorker) return resolve();

    try {
      const registration = await navigator.serviceWorker.register(url);
      const activateHandler = () =>
        setTimeout(() => {
          const isCurrentScope = new RegExp(window.location.origin).test(
            registration.scope,
          );
          const isActivated = Boolean(registration.active);

          if (isCurrentScope && isActivated) {
            return resolve(registration.active);
          }

          return activateHandler();
        }, 500);

      activateHandler();
    } catch (err) {
      /* eslint-disable */
      console.error(`Can't register e2e worker from ${url}!`);
      console.error(err);
      /* eslint-enable */

      return resolve(null);
    }
  });
}

export default {
  getServiceWorkerWithActivation,
  SWE2EController,
};
