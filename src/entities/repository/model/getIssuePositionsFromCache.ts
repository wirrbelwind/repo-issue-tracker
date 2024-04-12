import { IssuesCache } from "../types/IssuesCache"

export const getIssuePositionsFromCache = (repositoryId: number) => {
	const cachedData = localStorage.getItem(repositoryId.toString())

	if (!cachedData) {
		return null
	}

	return JSON.parse(cachedData) as IssuesCache
}
