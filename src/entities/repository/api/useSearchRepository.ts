import { useMutation } from '@tanstack/react-query'
import { fetchRepo } from './fetchRepo'

export const useSearchRepository = () => {
	return useMutation({
		mutationKey: ['search-repo'],
		mutationFn: fetchRepo
})
}
