import { IssueAPI } from "../types/IssueAPI";
import { IssueStatus } from "../types/IssueStatus";

export const getStatusIssueAPI = (issueAPI: IssueAPI): IssueStatus => {
	if (issueAPI.state === 'open') {
		if (issueAPI.assignee) {
			return 'in progress'
		}
		else {
			return 'todo'
		}
	}

	if (issueAPI.state === 'closed') {
		return 'done'
	}

	throw new Error(`Incorrect data in Issue ${issueAPI.id} from GitHub API `)
}