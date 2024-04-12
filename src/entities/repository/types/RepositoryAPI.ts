export interface RepositoryAPI {
	id: number
	name: string
	full_name: string
	owner: {
		login: string
		avatar_url: string
		html_url: string
	}
	private: boolean
	html_url: string
	stargazers_count: number
}