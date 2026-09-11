export interface Chat {
  id: string;
  title: string;
  updateTime: number;
}

export interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  chatId: string;
}

export interface MessageRequestBody {
  model: string;
  messages: Message[];
}