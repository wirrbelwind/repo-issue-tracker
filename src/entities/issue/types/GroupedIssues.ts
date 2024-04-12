import { Issue } from "./Issue";
import { IssueStatus } from "./IssueStatus";

export type GroupedIssues = Record<IssueStatus, Issue[]>
