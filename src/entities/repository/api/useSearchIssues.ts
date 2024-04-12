import { useQuery } from '@tanstack/react-query'
import { Octokit } from 'octokit'
import { issueAdapter } from './issueAdapter'
import { GroupedIssues } from '../types/GroupedIssues'
import { Repository } from '../types/Repository'
import { ISSUES_QUERY_KEY } from '../config/ISSUES_QUERY_KEY'
import { getIssueRequestOptions } from '../config/getIssueRequestOptions'
import { IssuesSearchParams } from '../types/IssuesSearchParams'
import { fetchIssues } from './fetchIssues'
import { useGithubCLient } from 'app/providers/GithubClient'

export const useSearchIssues = (issuesSearchParams: IssuesSearchParams | null) => {
	const githubClient = useGithubCLient()

	return useQuery<GroupedIssues>({
		queryKey: [ISSUES_QUERY_KEY],
		enabled: Boolean(issuesSearchParams),
		queryFn: async () => fetchIssues(githubClient, issuesSearchParams!)
	})
}
