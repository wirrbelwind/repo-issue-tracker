import { Box, Grid } from "@chakra-ui/react"
import { RiCalendarTodoLine } from "react-icons/ri";
import { GrInProgress } from "react-icons/gr";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import { Board, IssueStatus, RepositoryInfo, useRepoStore, useSearchIssues } from "entities/repository";
import { DndContext, rectIntersection } from '@dnd-kit/core'
import { useEffect } from "react";

export const KanbanBoards = () => {
	const repoStore = useRepoStore()
	const issuesQuery = useSearchIssues(repoStore.repo ? { ownerName: repoStore.repo.ownerName, repositoryName: repoStore.repo.name } : null)

	useEffect(() => {
		if (!issuesQuery.data) {
			return
		}
		repoStore.setIssues(issuesQuery.data)
	}, [issuesQuery.data])

	return (
		<Box>
			{
				repoStore.repo && (
					<RepositoryInfo repo={repoStore.repo} />
				)
			}

			{
				repoStore.issues && (
					<DndContext

						collisionDetection={rectIntersection}
						onDragEnd={e => {
							const { active, over } = e
							if (!active || !over) {
								return
							}
							console.log(active)

							const activeIssueBoard = active.data.current?.parent as IssueStatus
							const activeIssueId = active.id as number

							if (over.data.current?.type === 'Board') {
								if (over.id === active.data.current.parent) {
									console.log('same board')
									return
								}

								// replace issue to empty board
								const boardName = over.id as IssueStatus

								console.log(`Issue ${active.id} from board ${activeIssueBoard} to board ${boardName}`)
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
						}}
					>
						<Grid
							h="100%"
							mt="1rem"
							gap="1rem"
							templateColumns="repeat(3, 1fr)"
						>
							<Board
								title="todo"
								colorTheme="gray"
								Icon={RiCalendarTodoLine}
								issues={repoStore.issues.todo}
							/>
							<Board
								title="in progress"
								colorTheme="orange"
								Icon={GrInProgress}
								issues={repoStore.issues["in progress"]}
							/>
							<Board
								title="done"
								colorTheme="green"
								Icon={RiVerifiedBadgeFill}
								issues={repoStore.issues.done}
							/>
						</Grid>
					</DndContext>
				)
			}
		</Box>
	)
}
