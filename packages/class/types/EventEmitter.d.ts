declare class EventEmitter {
  on(event: string, listener: CallableFunction): Function;

  off(event: string, listener: CallableFunction): void;

  once(event: string, listener: CallableFunction): void;

  emit(event: string, ...args: any): void;
}

export default EventEmitter;
