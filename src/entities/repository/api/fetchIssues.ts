import { Octokit } from "octokit";
import { IssuesSearchParams } from "../types/IssuesSearchParams";
import { getIssueRequestOptions } from "../config/getIssueRequestOptions";
import { GroupedIssues } from "../types/GroupedIssues";
import { issueAdapter } from "./issueAdapter";
import { IssueAPI } from "../types/IssueAPI";
import { groupApiIssuesByStatus } from "./groupApiIssuesByStatus";

export const fetchIssues = async (
	octokitClient: Octokit,
	{ ownerName, repositoryName }: IssuesSearchParams
) => {
	const response = await octokitClient.request<IssueAPI[]>(getIssueRequestOptions(repositoryName, ownerName))

	const groupedIssues = groupApiIssuesByStatus(response.data)

	return groupedIssues
}
