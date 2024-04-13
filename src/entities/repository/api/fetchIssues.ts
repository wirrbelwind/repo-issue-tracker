import { Octokit } from "octokit";
import { IssuesSearchParams } from "../types/IssuesSearchParams";
import { getIssueRequestOptions } from "../config/getIssueRequestOptions";
import { GroupedIssues } from "../types/GroupedIssues";
import { issueAdapter } from "./issueAdapter";
import { IssueAPI } from "../types/IssueAPI";
import { groupApiIssuesByStatus } from "./groupApiIssuesByStatus";
import { Issue } from "../types/Issue";

export const fetchIssues = async (
	octokitClient: Octokit,
	{ ownerName, repositoryName }: IssuesSearchParams
) => {

	const response = await octokitClient.request<IssueAPI[]>(`GET /repos/${ownerName}/${repositoryName}/issues`)
	// const groupedIssues = groupApiIssuesByStatus(response.data)

	// return groupedIssues
	return response.data.map(issueAdapter)
}
