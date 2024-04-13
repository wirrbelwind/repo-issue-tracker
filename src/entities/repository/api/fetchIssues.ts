import { Octokit } from "octokit";
import { IssuesSearchParams } from "../types/IssuesSearchParams";
import { issueAdapter } from "./issueAdapter";
import { IssueAPI } from "../types/IssueAPI";
import { getIssueRequestOptions } from "../config/getIssueRequestOptions";

export const fetchIssues = async (
  octokitClient: Octokit,
  { repositoryName, ownerName }: IssuesSearchParams,
) => {
  const response = await octokitClient.request<IssueAPI[]>(
    // @ts-ignore Octokit library cant understand types of args right
    getIssueRequestOptions(repositoryName, ownerName),
  );

  return response.data.map(issueAdapter);
};
