import { Card, CardBody, CardFooter, CardHeader, Link } from "@chakra-ui/react"
import { formatDistance } from 'date-fns'
// import { useDrag } from "../../../widgets/KanbanBoards/model/DragContext"
// import { useRepoStore } from "../../../widgets/KanbanBoards/model/useRepoStore"
import { useDraggable , useDroppable} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface IssueCardProps {
	id: number
	URL: string
	title: string
	createdAt: Date
	authorName: string
	commentsQuantity: number
	serialNumber: number
	parent: string
}

export const IssueCard = ({
	URL,
	authorName,
	commentsQuantity,
	createdAt,
	id,
	serialNumber,
	title,
	parent
}: IssueCardProps) => {
	// const drag = useDrag()
	// const repoStore = useRepoStore()
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
			// index,
			parent
		}
	})
	// attributes,
	// listeners,
	// setNodeRef,
	// transform


	return (
		<Card
			border="1px dashed"
			cursor="grab"
			// draggable
			{...drag.listeners}
			{...drag.attributes}
			ref={drag.isDragging ? drag.setNodeRef : drop.setNodeRef}
			transform={CSS.Translate.toString(drag.transform)}
			bg={drop.isOver ? "red" : "white"}
		// bg={drag?.issueId === id ? "cyan" : "white"}
		// onDragStart={() => drag?.setIssueId(id)}
		// onDrop={e => {
		// 	e.preventDefault()
		// 	console.log('drop', id)
		// 	if(!drag?.issueId) {
		// 		return
		// 	}
		// 	if(drag.issueId === id) {
		// 		return
		// 	}

		// 	repoStore.setIssuePosition(
		// 		drag.issueId,
		// 		id,
		// 		"todo",
		// 		"todo"
		// 	)
		// }}
		// onDragOver={e => {
		// 	e.preventDefault()
		// 	// console.log('over', id)
		// }}
		// onDragEnd={() => drag?.setIssueId(null)}
		>
			<CardHeader>
				<Link href={URL} isExternal>{title}</Link>
			</CardHeader>

			<CardBody>
				{`#${serialNumber} ${title} opened ${formatDistance(createdAt, Date.now())} ago`}
			</CardBody>

			<CardFooter>{`${authorName} | Comments: ${commentsQuantity}`}</CardFooter>
		</Card>
	)
}