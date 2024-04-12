import { Octokit } from "octokit"
import { createContext, useContext } from "react"
import { AppProvider } from "../AppProvider"

const githubClient = new Octokit({
	auth: import.meta.env.GITHUB_API_KEY
})

const guthubClientContext = createContext<Octokit | null>(null)

export const GithubClientProvider: AppProvider = ({ children }) => {
	return (
		<guthubClientContext.Provider value={githubClient}>
			{children}
		</guthubClientContext.Provider>
	)
}

/**
 * @description Impoerting this hook is exception for Feature Sliced Design
 */
export const useGithubCLient = () => useContext(guthubClientContext)
