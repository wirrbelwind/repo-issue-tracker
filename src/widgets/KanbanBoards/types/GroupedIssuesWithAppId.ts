import { IssueStatus } from "../../../entities/issue/types/IssueStatus";
import { IssueWithPosition } from "./IssueWithPosition";

export type GroupedIssuesWithAppId = Record<IssueStatus, IssueWithPosition[]>
