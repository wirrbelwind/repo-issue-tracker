import { IssueStatus } from "./IssueStatus";
import { IssueWithPosition } from "./IssueWithPosition";

export type GroupedIssuesWithPosition = Record<IssueStatus, IssueWithPosition[]>
