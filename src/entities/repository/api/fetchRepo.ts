import { Octokit } from "octokit";
import { getRepoRequestOptions } from "../config/getRepoRequestOptions";
import { repositoryAdapter } from "./repositoryAdapter";

export const fetchRepo = async ({
  repositoryName,
  username,
}: {
  username: string;
  repositoryName: string;
}) => {
  const octokit = new Octokit({
    auth: import.meta.env.GITHUB_API_KEY,
  });

  const response = await octokit.request(
    getRepoRequestOptions(username, repositoryName),
  );

  return repositoryAdapter(response.data);
};
