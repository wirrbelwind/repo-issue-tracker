import { IssueStatus } from "./IssueStatus";

export interface Issue {
  github_id: number;
  URL: string;
  state: IssueStatus;
  title: string;
  createdAt: Date;
  authorName: string;
  commentsQuantity: number;
  serialNumber: number;
}
