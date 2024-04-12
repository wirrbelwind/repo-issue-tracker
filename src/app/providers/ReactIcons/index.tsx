import { IconContext } from "react-icons"
import { AppProvider } from "../AppProvider"
import { iconContext } from "./config"

export const IconsProvider: AppProvider = ({ children }) => {
	return (
		<IconContext.Provider value={iconContext} >
			{children}
		</IconContext.Provider>
	)
}