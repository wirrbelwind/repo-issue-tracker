import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GroupedIssues } from '../../../entities/repository/types/GroupedIssues'
import { GroupedIssuesWithAppId } from '../../../entities/repository/types/GroupedIssuesWithPosition'
import { getCachedIssues } from './getCachedIssues'
import { getIssuesWithPositions } from './getIssuesWithPositions'
import { Repository } from '../../../shared/types/Repository'
import { IssueStatus } from '../../../entities/repository/types/IssueStatus'

interface State {
	repo: Repository | null
	issues: GroupedIssuesWithAppId | null
}

interface Actions {
	setRepo: (repo: Repository) => void
	setIssues: (issues: GroupedIssues) => void
	setIssuePosition: (masterIssueId: number, slaveIssueId: number, masterIssuegroup: IssueStatus, slaveIssueGroup: IssueStatus) => void
}

export const useRepoStore = create<State & Actions>()(
	immer((set) => ({
		repo: null,
		issues: null,

		setRepo: (repo) => {
			set(state => {
				state.repo = repo
			})
		},
		setIssues: (issues) => {
			set(state => {
				if (!state.repo) {
					throw new Error('Repo is null')
				}

				const cachedIssues = getCachedIssues(state.repo.id)

				state.issues = {
					"in progress": getIssuesWithPositions(issues['in progress'], cachedIssues, "in progress"),
					"done": getIssuesWithPositions(issues['done'], cachedIssues, "done"),
					"todo": getIssuesWithPositions(issues['todo'], cachedIssues, 'todo')
				}
			})
		},
		setIssuePosition: (masterIssueId, slaveIssueId, masterIssuegroup, slaveIssuegroup) => {
			set(state => {
				if (!state.issues) {
					throw new Error(`Issues is null`)
				}

				const masterIssueIndex = state.issues[masterIssuegroup].findIndex(issue => issue.github_id === masterIssueId)
				const masterIssue = state.issues[masterIssuegroup][masterIssueIndex]

				const slaveIssueIndex = state.issues[masterIssuegroup].findIndex(issue => issue.github_id === slaveIssueId)
				const slaveIssue = state.issues[slaveIssuegroup][slaveIssueIndex]


				state.issues[slaveIssuegroup].splice(slaveIssueIndex + 1, 0, masterIssue)

				// if (masterIssuegroup !== slaveIssuegroup) {
				state.issues[masterIssuegroup].splice(masterIssueIndex, 1)
				// }
			})

		}
	}))
)
