import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";
import { getIssuesQueryKey } from "../config/getIssuesQueryKey";
import { IssuesSearchParams } from "../types/IssuesSearchParams";
import { fetchIssues } from "./fetchIssues";
import { Issue } from "../types/Issue";

export const useSearchIssues = (
  issuesSearchParams: IssuesSearchParams | null,
) => {
  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_API_KEY,
  });
  const key = getIssuesQueryKey(issuesSearchParams?.repositoryName ?? "");

  return useQuery<Issue[]>({
    enabled: Boolean(issuesSearchParams),
    queryKey: [key],
    queryFn: () => fetchIssues(octokit, issuesSearchParams!),
  });
};
