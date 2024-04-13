import { Issue } from "../types/Issue"
import { IssuePosition } from "../types/IssuePosition"
import { IssueStatus } from "../types/IssueStatus"
import { IssuesCache } from "../types/IssuesCache"
import { Repository } from "../types/Repository"
import { getIssuePositionsFromCache } from "./getIssuePositionsFromCache"

export const cacheIssuePosition = (repositoryId: Repository['id'], issueId: Issue['github_id'], position: number, status: IssueStatus) => {
	const cachedIssues = getIssuePositionsFromCache(repositoryId)

	const issuePosition: IssuePosition = {
		order: position,
		group: status
	}

	if (!cachedIssues) {
		const newCacheData: IssuesCache = {
			[issueId]: issuePosition
		}

		localStorage.setItem(repositoryId.toString(), JSON.stringify(newCacheData))

		return
	}

	cachedIssues[issueId] = issuePosition
	localStorage.setItem(repositoryId.toString(), JSON.stringify(cachedIssues))
}
