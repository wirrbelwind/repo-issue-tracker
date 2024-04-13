import { Issue } from "../../types/Issue";
import { IssueAPI } from "../../types/IssueAPI";
import { extractIssueStatus } from "../../model/extractIssueStatus";

export const issueAdapter = (issueAPI: IssueAPI): Issue => {
	return {
		authorName: issueAPI.user.login,
		commentsQuantity: issueAPI.comments,
		createdAt: new Date(issueAPI.created_at),
		github_id: issueAPI.id,
		serialNumber: issueAPI.number,
		title: issueAPI.title,
		URL: issueAPI.html_url,
		state: extractIssueStatus(issueAPI)
	}
}
