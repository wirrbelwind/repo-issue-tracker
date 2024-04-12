import { Octokit } from 'octokit'
import { GITHUB_API_BASE_URL } from './GITHUB_API_BASE_URL'

export const getIssueRequestOptions = (repoName: string, ownerName: string) => ({
	method: "GET",
	baseUrl: GITHUB_API_BASE_URL,
	url: `repos/${repoName}/${ownerName}/issues?state=all`,
})
