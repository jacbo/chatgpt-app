export interface Chat {
  id: string;
  name: string;
  updateTime: number;
}

export interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
}