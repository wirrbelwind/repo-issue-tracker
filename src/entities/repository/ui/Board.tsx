import { Box, BoxProps, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { IssueWithPosition } from "../types/IssueWithPosition"
import { IssueCard } from "./IssueCard"
import { useDroppable } from '@dnd-kit/core'

interface BoardProps extends BoxProps {
	title: string
	Icon?: IconType
	colorTheme?: string
	issues: IssueWithPosition[]
}

export const Board = ({
	title,
	Icon,
	issues,
	colorTheme,
	...styleProps
}: BoardProps) => {
	const { setNodeRef } = useDroppable({
		id: title,
		data: {
			type: "Board"
		}
	})

	return (
		<Box
			border={`1px solid ${colorTheme}`}
			flexGrow={1}
			flexShrink={0}
			{...styleProps}
		>
			<HStack
				justifyContent="center"
			>
				<Text
					color={colorTheme}
					fontSize="1.4rem"
				>
					{title}</Text>
				{
					Icon && <Icon color={colorTheme} />
				}
			</HStack>

			<Divider />

			<VStack
				gap="1rem"
				align="stretch"
				ref={setNodeRef}
			>
				{
					issues
						.slice()
						.sort((a, b) => {
							if (a.position.order < b.position.order) {
								return -1
							}
							if (a.position.order > b.position.order) {
								return 1
							}
							return 0
						})
						.map(issue => (
							<IssueCard
								parent={title}
								id={issue.github_id}
								key={issue.github_id}
								URL={issue.URL}
								authorName={issue.authorName}
								commentsQuantity={issue.commentsQuantity}
								createdAt={issue.createdAt}
								serialNumber={issue.serialNumber}
								title={issue.title}
							/>
						))
				}
			</VStack>

		</Box>
	)
}
