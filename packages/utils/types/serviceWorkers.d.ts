declare module '@endpass/utils/serviceWorkers' {
  export function getServiceWorkerWithActivation(url: string): Promise<ServiceWorker | null>;
}
