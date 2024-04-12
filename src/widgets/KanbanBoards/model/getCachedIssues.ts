import { IssuesCache } from "../types/IssuesCache"

export const getCachedIssues = (repositoryId: number) => {
	// const cachedData = cacheAdapter.getItem(repositoryId.toString())
	const cachedData = localStorage.getItem(repositoryId.toString())

	if(!cachedData) {
		return null
	}

	return JSON.parse(cachedData) as IssuesCache
}
