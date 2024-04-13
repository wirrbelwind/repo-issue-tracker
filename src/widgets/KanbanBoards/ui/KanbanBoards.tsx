import { Box, Grid } from "@chakra-ui/react"
import { RiCalendarTodoLine } from "react-icons/ri";
import { GrInProgress } from "react-icons/gr";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import { Board, RepositoryInfo } from "entities/repository";
import { DndContext, rectIntersection } from '@dnd-kit/core'
import { useKanbanBoard } from "../model/useKanbanBoard";

export const KanbanBoards = () => {
	const {
		repo,
		issues,
		onDragEndHandler
	} = useKanbanBoard()

	return (
		<Box>
			{
				repo && (
					<RepositoryInfo repo={repo} />
				)
			}

			{
				issues && (
					<DndContext
						collisionDetection={rectIntersection}
						onDragEnd={onDragEndHandler}
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
								issues={issues.todo}
							/>
							<Board
								title="in progress"
								colorTheme="orange"
								Icon={GrInProgress}
								issues={issues["in progress"]}
							/>
							<Board
								title="done"
								colorTheme="green"
								Icon={RiVerifiedBadgeFill}
								issues={issues.done}
							/>
						</Grid>
					</DndContext>
				)
			}
		</Box>
	)
}
