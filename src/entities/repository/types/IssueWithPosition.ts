import { Issue } from "./Issue";
import { IssuePosition } from "./IssuePosition";

export interface IssueWithPosition extends Issue {
	position: IssuePosition
}
