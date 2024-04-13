import { Card, CardBody, CardFooter, CardHeader, Fade, Flex, Link } from "@chakra-ui/react"
import { formatDistance } from 'date-fns'
// import { useDrag } from "../../../widgets/KanbanBoards/model/DragContext"
// import { useRepoStore } from "../../../widgets/KanbanBoards/model/useRepoStore"
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IoMdArrowRoundUp } from "react-icons/io";
interface IssueCardProps {
	id: number
	URL: string
	title: string
	createdAt: Date
	authorName: string
	commentsQuantity: number
	serialNumber: number
	parent: string
	position: number
}

export const IssueCard = ({
	URL,
	authorName,
	commentsQuantity,
	createdAt,
	id,
	serialNumber,
	title,
	parent,
	position
}: IssueCardProps) => {
	const drop = useDroppable({
		id: id,
		data: {
			type: 'Issue',
			parent
		}
	})

	const drag = useDraggable({
		id: id,
		data: {
			parent
		}
	})

	return (
		<Card
			border="1px dashed"
			cursor="grab"
			{...drag.listeners}
			{...drag.attributes}
			ref={drag.isDragging ? drag.setNodeRef : drop.setNodeRef}
			transform={CSS.Translate.toString(drag.transform)}
			borderColor={drop.isOver ? "pink" : "black"}
			borderWidth="3px"
		>
			{position}
			<Fade in={drop.isOver}>
				<Flex justifyContent="center">
					<IoMdArrowRoundUp size="2rem" />
				</Flex>
			</Fade>

			<CardHeader>
				<Link href={URL} fontWeight="bold">
					{`#${serialNumber} ${title} opened ${formatDistance(createdAt, Date.now())} ago`}
				</Link>
			</CardHeader>

			<CardFooter>{`${authorName} | Comments: ${commentsQuantity}`}</CardFooter>
		</Card>
	)
}
