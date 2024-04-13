import { IssueStatus } from "../types/IssueStatus";
import { IssueWithPosition } from "../types/IssueWithPosition";
import { cacheIssuePosition } from "./cacheIssuePosition";

export const cacheBoard = (
  issues: IssueWithPosition[],
  repoId: number,
  board: IssueStatus,
) => {
  issues.forEach((issue) => {
    cacheIssuePosition(repoId, issue.github_id, issue.position, board);
  });
};
