import { ChakraProvider as Provider } from '@chakra-ui/react'
import { AppProvider } from '../AppProvider'

export const ChakraProvider: AppProvider = ({ children }) => {
	return (
		<Provider>
			{children}
		</Provider>
	)
}