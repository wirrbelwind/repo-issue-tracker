import { Issue } from "../../../entities/repository/types/Issue";
import { IssueStatus } from "../../../entities/repository/types/IssueStatus";
import { IssueWithPosition } from "../../../entities/repository/types/IssueWithPosition";
import { IssuesCache } from "../../../entities/repository/types/IssuesCache";

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