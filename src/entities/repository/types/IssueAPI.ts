export interface IssueAPI {
	id: number
	html_url: string
	"number": number
	state: 'open' | 'closed' | 'all'
	title: string
	created_at: string
	user: {
		login: string
	}
	comments: number
	assignee?: {
		login: string
	}
}
