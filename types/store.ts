export type CallbackStoreFunction = (
  messageType: 'success' | 'error',
  messageText: string,
  data?: any,
) => void;
