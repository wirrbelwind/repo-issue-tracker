import { IssueStatus } from "./IssueStatus"

export interface Issue {
	// id: number
	github_id: number
	URL: string
	state: IssueStatus
	title: string
	createdAt: Date
	authorName: string
	commentsQuantity: number
	serialNumber: number
}