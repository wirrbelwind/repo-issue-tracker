import { Issue } from "../types/Issue"
import { IssuesCache } from "../types/IssuesCache"
import { Repository } from "../types/Repository"
import { getIssuePositionsFromCache } from "./getIssuePositionsFromCache"

export const cacheIssuePosition = (repositoryId: Repository['id'], issueId: Issue['github_id'], position: number) => {
	const cachedIssues = getIssuePositionsFromCache(repositoryId)

	if (!cachedIssues) {
		const newCacheData: IssuesCache = {
			[issueId]: position
		}

		localStorage.setItem(repositoryId.toString(), JSON.stringify(newCacheData))

		return
	}

	cachedIssues[issueId] = position
	localStorage.setItem(repositoryId.toString(), JSON.stringify(cachedIssues))
}
