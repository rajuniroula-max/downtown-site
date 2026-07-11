export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "paused";
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
