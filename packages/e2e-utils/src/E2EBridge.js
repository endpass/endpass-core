/* eslint-disable no-unused-expressions */
export default class E2EBridge {
  constructor() {
    this.pausedResolver = null;
    this.resumeResolver = null;
  }

  awaitClientPaused() {
    return new Promise(resolve => {
      this.pausedResolver = resolve;
    });
  }

  resumeClient() {
    this.resumeResolver && this.resumeResolver();
  }

  awaitClientResume() {
    this.pausedResolver && this.pausedResolver();
    return new Promise(resolve => {
      if (this.resumeResolver) {
        resolve();
      } else {
        this.resumeResolver = resolve;
      }
    });
  }
}
