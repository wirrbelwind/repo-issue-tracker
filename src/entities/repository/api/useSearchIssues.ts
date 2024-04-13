import { useQuery } from '@tanstack/react-query'
import { Octokit } from 'octokit'
import { issueAdapter } from './issueAdapter'
import { GroupedIssues } from '../types/GroupedIssues'
import { Repository } from '../types/Repository'
import { getIssuesQueryKey } from '../config/getIssuesQueryKey'
import { getIssueRequestOptions } from '../config/getIssueRequestOptions'
import { IssuesSearchParams } from '../types/IssuesSearchParams'
import { fetchIssues } from './fetchIssues'
import { useGithubCLient } from 'app/providers/GithubClient'
import { Issue } from '../types/Issue'

export const useSearchIssues = (issuesSearchParams: IssuesSearchParams | null) => {
	// const githubClient = useGithubCLient()
	const octokit = new Octokit({
		auth: import.meta.env.VITE_GITHUB_API_KEY
	})
	const key = getIssuesQueryKey(issuesSearchParams ? issuesSearchParams.repositoryName : '')

	return useQuery<Issue[]>({
		enabled: Boolean(issuesSearchParams),
		queryKey: [key],
		queryFn: () => fetchIssues(octokit, issuesSearchParams!)
	})
}
