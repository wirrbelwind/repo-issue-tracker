import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GroupedIssues } from '../../types/GroupedIssues'
import { GroupedIssuesWithPosition } from '../../types/GroupedIssuesWithPosition'
import { getIssuePositionsFromCache } from '../getIssuePositionsFromCache'
import { getIssuesWithPositions } from '../getIssuesWithPositions'
import { Repository } from '../../types/Repository'
import { IssueStatus } from '../../types/IssueStatus'
import { cacheIssuePosition } from '../cacheIssuePosition'
import { Issue, IssueWithPosition } from 'entities/repository'

interface State {
	repo: Repository | null
	issues: GroupedIssuesWithPosition | null
}

interface Actions {
	setRepo: (repo: Repository) => void
	setIssues: (issues: Issue[]) => void
	setIssuePosition: (options: {
		activeIssueId: number
		activeBoard: IssueStatus

		targetIssueId?: number
		targetBoard: IssueStatus
	}) => void
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
		setIssues: issues => {
			set(state => {
				if (!state.repo) {
					throw new Error('Repo is null')
				}

				const cachedIssues = getIssuePositionsFromCache(state.repo.id)

				// if (cachedIssues && state.issues) {
				// Object.entries(cachedIssues).map(([issueId, { group, order }]) => {

				// })
				const handledIssues = issues.reduce<{
					cached: GroupedIssuesWithPosition
					notCached: Issue[]
				}>((acc, issue) => {
					const issueId = issue.github_id

					const issueCache = cachedIssues ? cachedIssues[issueId] : null

					if (issueCache) {
						const issueWithCachedPosition: IssueWithPosition = {
							...issue,
							position: issueCache.order,
							state: issueCache.group
						}

						acc.cached[issueWithCachedPosition.state].push(issueWithCachedPosition)
					}
					else {
						acc.notCached.push(issue)
					}

					return acc
				}, {
					cached: {
						todo: [],
						done: [],
						"in progress": []
					},
					notCached: []
				})

				state.issues = handledIssues.cached

				handledIssues.notCached.forEach(issue => {
					state.issues[issue.state].push({
						...issue,
						position: state.issues[issue.state].length
					})
				})
				// }

				// state.issues = {
				// 	"in progress": getIssuesWithPositions(issues['in progress'], cachedIssues, "in progress"),
				// 	"done": getIssuesWithPositions(issues['done'], cachedIssues, "done"),
				// 	"todo": getIssuesWithPositions(issues['todo'], cachedIssues, 'todo')
				// }
			})
		},
		setIssuePosition: ({
			activeIssueId,
			activeBoard,
			targetIssueId,
			targetBoard
		}) => {
			set(state => {
				if (!state.repo) {
					throw new Error(`Repo is null`)
				}

				if (!state.issues) {
					throw new Error(`Issues is null`)
				}

				const masterIssueIndex = state.issues[activeBoard].findIndex(issue => issue.github_id === activeIssueId)
				const masterIssue = state.issues[activeBoard][masterIssueIndex]

				const slaveIssueIndex = state.issues[activeBoard].findIndex(issue => issue.github_id === targetIssueId)
				const slaveIssue = state.issues[targetBoard][slaveIssueIndex]

				if (slaveIssue) {
					masterIssue.position = slaveIssue.position
					slaveIssue.position++
				}
				else {
					const lastIssueInBoard = state.issues[targetBoard][state.issues[targetBoard].length - 1]

					if (lastIssueInBoard) {
						masterIssue.position = lastIssueInBoard.position + 1

					}
					else {
						masterIssue.position = 1
					}
					state.issues[targetBoard].push(masterIssue)
				}

				state.issues[activeBoard].splice(masterIssueIndex, 1)


				if (slaveIssue) {
					state.issues[targetBoard].splice(slaveIssueIndex + 1, 0, masterIssue)
				}


				state.issues[activeBoard].forEach(issue => {
					cacheIssuePosition(state.repo.id,issue.github_id, issue.position, activeBoard)
				})

				state.issues[targetBoard].forEach(issue => {
					cacheIssuePosition(state.repo.id,issue.github_id, issue.position, targetBoard)
				})
				// sort all issues after changing boards
				// state.issues[targetBoard].sort((a, b) => {
				// 	if (a.position < b.position) {
				// 		return -1
				// 	}
				// 	if (a.position > b.position) {
				// 		return 1
				// 	}
				// 	return 0
				// })


			})

		}
	}))
)
