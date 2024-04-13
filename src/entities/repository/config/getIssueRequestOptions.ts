export const getIssueRequestOptions = (repoName: string, ownerName: string) => {
	return `GET /repos/${ownerName}/${repoName}/issues?state=all`
}
