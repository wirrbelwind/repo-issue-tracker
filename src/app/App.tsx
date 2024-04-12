import { Container, Divider } from "@chakra-ui/react"
import { SearchRepository } from "../features/search-repository"
import { KanbanBoards } from "../widgets/KanbanBoards/ui/KanbanBoards";

export const App = () => {
	return (
		<Container maxW="5xl">
			<SearchRepository />
			<Divider my="1rem" />
			<KanbanBoards />
		</Container>
	)
}
