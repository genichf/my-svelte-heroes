let messages = $state<string[]>([]);

export const messageService = {
  get all() { return messages; },
  add(message: string) {
    messages.push(message);
  },
  clear() {
    messages = [];
  }
};