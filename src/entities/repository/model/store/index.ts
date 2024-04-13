import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { GroupedIssuesWithPosition } from "../../types/GroupedIssuesWithPosition";
import { getIssuePositionsFromCache } from "../getIssuePositionsFromCache";
import { Repository } from "../../types/Repository";
import { IssueStatus } from "../../types/IssueStatus";
import { Issue } from "../../types/Issue";
import { IssueWithPosition } from "../../types/IssueWithPosition";
import { cacheBoard } from "../cacheBoard";

interface State {
  repo: Repository | null;
  issues: GroupedIssuesWithPosition | null;
}

interface Actions {
  setRepo: (repo: Repository) => void;
  setIssues: (issues: Issue[]) => void;
  setIssuePosition: (options: {
    activeIssueId: number;
    activeBoard: IssueStatus;

    targetIssueId?: number;
    targetBoard: IssueStatus;
  }) => void;
}

export const useRepoStore = create<State & Actions>()(
  immer((set) => ({
    repo: null,
    issues: null,

    setRepo: (repo) => {
      set((state) => {
        state.repo = repo;
      });
    },
    setIssues: (issues) => {
      set((state) => {
        if (!state.repo) {
          throw new Error("Repo is null");
        }

        // if (!state.issues) {
        //   throw new Error(`Issues is null`);
        // }

        const cachedIssues = getIssuePositionsFromCache(state.repo.id);

        const handledIssues = issues.reduce<{
          cached: GroupedIssuesWithPosition;
          notCached: Issue[];
        }>(
          (acc, issue) => {
            const issueId = issue.github_id;

            const issueCache = cachedIssues ? cachedIssues[issueId] : null;

            if (issueCache) {
              const issueWithCachedPosition: IssueWithPosition = {
                ...issue,
                position: issueCache.order,
                state: issueCache.group,
              };

              acc.cached[issueWithCachedPosition.state].push(
                issueWithCachedPosition,
              );
            } else {
              acc.notCached.push(issue);
            }

            return acc;
          },
          {
            cached: {
              todo: [],
              done: [],
              "in progress": [],
            },
            notCached: [],
          },
        );

        state.issues = handledIssues.cached;

        handledIssues.notCached.forEach((issue) => {
          // @ts-expect-error Bug: zustand doesn't understand type of state.issues
          state.issues[issue.state].push({
            ...issue,
            // @ts-expect-error Bug: zustand doesn't understand type of state.issues
            position: state.issues[issue.state].length,
          });
        });
      });
    },
    setIssuePosition: ({
      activeIssueId,
      activeBoard,
      targetIssueId,
      targetBoard,
    }) => {
      set((state) => {
        if (!state.repo) {
          throw new Error(`Repo is null`);
        }

        if (!state.issues) {
          throw new Error(`Issues is null`);
        }

        // extract active and target issues from state
        const activeIssueIndex = state.issues[activeBoard].findIndex(
          (issue) => issue.github_id === activeIssueId,
        );
        const activeIssue = state.issues[activeBoard][activeIssueIndex];

        const targetIssueIndex = state.issues[targetBoard].findIndex(
          (issue) => issue.github_id === targetIssueId,
        );
        const targetIssue = state.issues[targetBoard][targetIssueIndex];

        // if action got target issue, then set active issue above the target issue
        if (targetIssue) {
          activeIssue.position = targetIssue.position;
          targetIssue.position++;
        }
        // if actiong didn't got target issue, then just add active issue to board
        else {
          const lastIssueInBoard =
            state.issues[targetBoard][state.issues[targetBoard].length - 1];

          if (lastIssueInBoard) {
            activeIssue.position = lastIssueInBoard.position + 1;
          } else {
            activeIssue.position = 1;
          }
          state.issues[targetBoard].push(activeIssue);
        }

        // delete issue from current location
        state.issues[activeBoard].splice(activeIssueIndex, 1);

        // add active issue to new location
        if (targetIssue) {
          state.issues[targetBoard].splice(
            targetIssueIndex + 1,
            0,
            activeIssue,
          );
        }

        // cache target board
        cacheBoard(state.issues[targetBoard], state.repo.id, targetBoard);

        // if issue moved from one board to another, then cache initial board
        if (activeBoard !== targetBoard) {
          cacheBoard(state.issues[activeBoard], state.repo.id, activeBoard);
        }
      });
    },
  })),
);
