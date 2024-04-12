import { Issue } from "../../../entities/repository/types/Issue"
import { Repository } from "../../../shared/types/Repository"
import { IssuesCache } from "../../../entities/repository/types/IssuesCache"
import { getCachedIssues } from "./getCachedIssues"

export const cacheIssuePosition = (repositoryId: Repository['id'], issueId: Issue['id'], position: number) => {
	const cachedIssues = getCachedIssues(repositoryId)

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
