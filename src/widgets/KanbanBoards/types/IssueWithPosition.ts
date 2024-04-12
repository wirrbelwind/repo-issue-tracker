import { Issue } from "../../../entities/issue/types/Issue";
import { IssueStatus } from "../../../entities/issue/types/IssueStatus";

export interface IssuePosition {
	group: IssueStatus
	order: number
}

export interface IssueWithPosition extends Issue {
	position: IssuePosition
}
