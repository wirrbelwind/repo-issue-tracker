import { useMutation } from '@tanstack/react-query'
import { Octokit } from 'octokit'
import { repositoryAdapter } from './repositoryAdapter'

export const useSearchRepository = () => {
	const octokit = new Octokit({
		auth: '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'
	})

	return useMutation({
		mutationKey: ['search-repo'],
		mutationFn: async ({ repositoryName, username }: { username: string, repositoryName: string }) => {
			const response = await octokit.request(`GET /repos/${username}/${repositoryName}`,
			)

			return repositoryAdapter(response.data)
		}
	})
}
