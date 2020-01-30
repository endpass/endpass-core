type EventItem = {
  cb: CallableFunction;
  data: any;
};

type EventHashList = Array<EventItem>;

type EventHashMap = {
  [hash: string]: EventHashList;
};
