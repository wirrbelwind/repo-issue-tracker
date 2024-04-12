import { Issue } from "../../../entities/issue/types/Issue";
import { IssueStatus } from "../../../entities/issue/types/IssueStatus";
import { IssueWithPosition } from "../types/IssueWithPosition";
import { IssuesCache } from "../types/IssuesCache";

export const getIssuesWithPositions = (issueList: Issue[], cachedIssues: IssuesCache | null, groupName: IssueStatus): IssueWithPosition[] => {

	return issueList.map((issue, index) => {
		const cachedPosition = cachedIssues ? cachedIssues[issue.github_id] : null

		return {
			...issue,
			position: cachedPosition ?? {
				group: groupName,
				order: index + 1
			}
		}
	})
}