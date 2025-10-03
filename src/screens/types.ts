export interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
}

export interface WebSocketMessage {
  type: 'message' | 'users' | 'welcome' | 'recent_messages';
  id?: string;
  text?: string;
  author?: string;
  timestamp?: string;
  createdAt?: number;
  users?: User[];
  messages?: Message[];
}