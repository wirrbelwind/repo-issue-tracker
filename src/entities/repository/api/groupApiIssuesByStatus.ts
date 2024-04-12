import { GroupedIssues } from "../types/GroupedIssues";
import { IssueAPI } from "../types/IssueAPI";
import { issueAdapter } from "./issueAdapter";

export const groupApiIssuesByStatus = (issuesApi: IssueAPI[]) => {
	const groupedIssues = issuesApi.reduce<GroupedIssues>((acc, issueApi) => {
		const adaptedIssue = issueAdapter(issueApi)

		if (!Array.isArray(acc[adaptedIssue.state])) {
			throw new Error(`Issue ${adaptedIssue.github_id} has wrong state (${adaptedIssue.state}). The group for this state doesn't exist`)
		}

		acc[adaptedIssue.state].push(adaptedIssue)
		return acc
	}, {
		'todo': [],
		'in progress': [],
		'done': []
	})

	return groupedIssues
}
