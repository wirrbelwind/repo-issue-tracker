import { useMutation } from '@tanstack/react-query'
import { Octokit } from 'octokit'
import { repositoryAdapter } from './repositoryAdapter'
import { useGithubCLient } from 'app/providers/GithubClient'

export const useSearchRepository = () => {
	const octokit = new Octokit({
		auth: import.meta.env.GITHUB_API_KEY
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

// curl -L -H "Accept: application/vnd.github+json" -H "Authorization: Bearer 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" -H "X-GitHub-Api-Version: 2022-11-28" https://api.github.com/repos/nashsu/FreeAskInternet/issues