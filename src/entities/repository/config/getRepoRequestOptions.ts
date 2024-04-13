export const getRepoRequestOptions = (username: string, repositoryName: string) => {
	return `GET /repos/${username}/${repositoryName}`
}
