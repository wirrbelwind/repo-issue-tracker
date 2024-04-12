import { useQuery } from '@tanstack/react-query'
import { Octokit } from 'octokit'
import { issueAdapter } from './adapter'
import { GroupedIssues } from '../types/GroupedIssues'
import { Repository } from '../../../shared/types/Repository'

export const useSearchIssues = (repository: Repository | null) => {
	const octokit = new Octokit({
		auth: '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'
	})

	return useQuery<GroupedIssues>({
		queryKey: [`search-issues`],
		enabled: Boolean(repository),
		queryFn: async () => {
			const response = await octokit.request(`GET /repos/${repository?.ownerName}/${repository?.name}/issues`,
				{ state: "all" }
			)

			console.log(response.data)

			const groupedIssues: GroupedIssues = response.data.reduce((acc, issueApi) => {
				const adaptedIssue = issueAdapter(issueApi)

				if (!Array.isArray(acc[adaptedIssue.state])) {
					throw new Error(`Issue ${adaptedIssue.id} has wrong state (${adaptedIssue.state}). The group for this state doesn't exist`)
				}

				acc[adaptedIssue.state].push(adaptedIssue)

				return acc
			}, {
				'todo': [],
				'in progress': [],
				'done': []
			})

			return groupedIssues
		},
	})
}
