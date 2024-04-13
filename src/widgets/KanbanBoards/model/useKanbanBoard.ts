import { IssueStatus, useRepoStore, useSearchIssues } from "entities/repository"
import { useCallback, useEffect } from "react"
import { DragEndEvent } from '@dnd-kit/core'

export const useKanbanBoard = () => {
	const repoStore = useRepoStore()
	const issuesQuery = useSearchIssues(repoStore.repo ? { ownerName: repoStore.repo.ownerName, repositoryName: repoStore.repo.name } : null)

	useEffect(() => {
		if (!issuesQuery.data) {
			return
		}
		
		repoStore.setIssues(issuesQuery.data)
	}, [issuesQuery.data])

	const onDragEndHandler = useCallback((e: DragEndEvent) => {
		const { active, over } = e
		if (!active || !over || !active.data.current) {
			return
		}

		const activeIssueBoard = active.data.current?.parent as IssueStatus
		const activeIssueId = active.id as number

		if (over.data.current?.type === 'Board') {
			if (over.id === active.data.current.parent) {
				console.log('same board')
				return
			}

			// replace issue to empty board
			const boardName = over.id as IssueStatus

			repoStore.setIssuePosition({
				activeIssueId,
				activeBoard: activeIssueBoard,
				targetBoard: boardName,
			})
		}

		if (over.data.current?.type === 'Issue') {
			const issueId = over.id as number
			const boardName = over.data.current.parent as IssueStatus
			console.log(`Issue ${active.id} from board ${activeIssueBoard} to issue ${issueId} in board ${boardName}`)

			repoStore.setIssuePosition({
				activeIssueId,
				activeBoard: activeIssueBoard,
				targetBoard: boardName,
				targetIssueId: issueId
			})
		}
	}, [])

	return {
		repo: repoStore.repo,
		issues: repoStore.issues,
		onDragEndHandler
	}
}
