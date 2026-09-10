import { Message } from "@/types/chat";

export type State = {
  displayNavigation: boolean;
  themeMode: "dark" | "light";
  currentModel: string;
  messageList: Message[];
  streamingId?: string | null;
}

export enum ActionType {
  UPDATE = "UPDATE",
  ADD_MESSAGE = "ADD_MESSAGE",
  UPDATE_MESSAGE = "UPDATE_MESSAGE"
}

type MessageAction = {
  type: ActionType.ADD_MESSAGE|ActionType.UPDATE_MESSAGE;
  message: Message;
}

type UpdateAction = {
  type: ActionType.UPDATE;
  field: string;
  value: any;
}

export type Action = UpdateAction|MessageAction;

export const initState: State = {
  displayNavigation: true,
  themeMode: "dark",
  currentModel: "gpt-3.5-turbo",
  messageList: []
}

export function reducer(state: State, action: Action): State { 
    switch (action.type) {
      case ActionType.UPDATE: {
        return {...state, [action.field]: action.value}
      }
      case ActionType.ADD_MESSAGE: {
        return {...state, messageList: [...state.messageList, action.message]}
      }
      case ActionType.UPDATE_MESSAGE: {
        return {...state, messageList: state.messageList.map(message => message.id === action.message.id ? action.message : message)}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}