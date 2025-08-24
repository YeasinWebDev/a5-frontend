export type TUserRole = "admin"| "user" | "agent";

export interface IItem {
  title?: string;
  url: string;
  component: any;
}