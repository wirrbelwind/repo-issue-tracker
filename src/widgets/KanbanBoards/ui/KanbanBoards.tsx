import { Box, Grid } from "@chakra-ui/react"
import { RiCalendarTodoLine } from "react-icons/ri";
import { GrInProgress } from "react-icons/gr";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import { Board } from "../../../shared/ui/Board";
import { IssueList } from "../../../entities/issue/ui/IssueList";
import { RepositoryInfo } from "../../../entities/repository";
import { useRepoStore } from "../model/useRepoStore";
import { useEffect } from "react";
import { useSearchIssues } from "../../../entities/issue/api/useSearchIssues";
// import { DragProvider } from "../model/DragContext";
import { DndContext, rectIntersection } from '@dnd-kit/core'

export const KanbanBoards = () => {
	const repoStore = useRepoStore()
	const issuesQuery = useSearchIssues(repoStore.repo)

	useEffect(() => {

		if (!issuesQuery.data) {
			console.log(1)
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
					// <DragProvider>
					<DndContext
						collisionDetection={rectIntersection}
						onDragEnd={console.log}
					>
						<Grid
							mt="1rem"
							gap="1rem"
							templateColumns="repeat(3, 1fr)"
						>
							<Board
								title="To do"
								colorTheme="gray"
								Icon={RiCalendarTodoLine}
								issues={repoStore.issues.todo}
								// items={<IssueList issues={repoStore.issues.todo} />}
							/>
							<Board
								title="In progress"
								colorTheme="orange"
								Icon={GrInProgress}
									issues={repoStore.issues["in progress"]}
								// items={<IssueList issues={repoStore.issues["in progress"]} />}
							/>
							<Board
								title="Done"
								colorTheme="green"
								Icon={RiVerifiedBadgeFill}
									issues={repoStore.issues.done}
								// items={<IssueList issues={repoStore.issues.done} />}
							/>
						</Grid>
					</DndContext>
					// </DragProvider>
				)
			}
		</Box>
	)
}
