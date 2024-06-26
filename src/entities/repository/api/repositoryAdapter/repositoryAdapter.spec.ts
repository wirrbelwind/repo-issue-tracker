import { describe, expect, it } from "vitest";
import { repositoryAdapter } from ".";
import { RepositoryAPI } from "../../types/RepositoryAPI";
import { Repository } from "../../types/Repository";

const repoApi = {
  id: 783833344,
  node_id: "R_kgDOLrhZAA",
  name: "llm.c",
  full_name: "karpathy/llm.c",
  private: false,
  owner: {
    login: "karpathy",
    id: 241138,
    node_id: "MDQ6VXNlcjI0MTEzOA==",
    avatar_url: "https://avatars.githubusercontent.com/u/241138?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/karpathy",
    html_url: "https://github.com/karpathy",
    followers_url: "https://api.github.com/users/karpathy/followers",
    following_url:
      "https://api.github.com/users/karpathy/following{/other_user}",
    gists_url: "https://api.github.com/users/karpathy/gists{/gist_id}",
    starred_url: "https://api.github.com/users/karpathy/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/karpathy/subscriptions",
    organizations_url: "https://api.github.com/users/karpathy/orgs",
    repos_url: "https://api.github.com/users/karpathy/repos",
    events_url: "https://api.github.com/users/karpathy/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/karpathy/received_events",
    type: "User",
    site_admin: false,
  },
  html_url: "https://github.com/karpathy/llm.c",
  description: "LLM training in simple, raw C/CUDA",
  fork: false,
  url: "https://api.github.com/repos/karpathy/llm.c",
  forks_url: "https://api.github.com/repos/karpathy/llm.c/forks",
  keys_url: "https://api.github.com/repos/karpathy/llm.c/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/karpathy/llm.c/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/karpathy/llm.c/teams",
  hooks_url: "https://api.github.com/repos/karpathy/llm.c/hooks",
  issue_events_url:
    "https://api.github.com/repos/karpathy/llm.c/issues/events{/number}",
  events_url: "https://api.github.com/repos/karpathy/llm.c/events",
  assignees_url: "https://api.github.com/repos/karpathy/llm.c/assignees{/user}",
  branches_url: "https://api.github.com/repos/karpathy/llm.c/branches{/branch}",
  tags_url: "https://api.github.com/repos/karpathy/llm.c/tags",
  blobs_url: "https://api.github.com/repos/karpathy/llm.c/git/blobs{/sha}",
  git_tags_url: "https://api.github.com/repos/karpathy/llm.c/git/tags{/sha}",
  git_refs_url: "https://api.github.com/repos/karpathy/llm.c/git/refs{/sha}",
  trees_url: "https://api.github.com/repos/karpathy/llm.c/git/trees{/sha}",
  statuses_url: "https://api.github.com/repos/karpathy/llm.c/statuses/{sha}",
  languages_url: "https://api.github.com/repos/karpathy/llm.c/languages",
  stargazers_url: "https://api.github.com/repos/karpathy/llm.c/stargazers",
  contributors_url: "https://api.github.com/repos/karpathy/llm.c/contributors",
  subscribers_url: "https://api.github.com/repos/karpathy/llm.c/subscribers",
  subscription_url: "https://api.github.com/repos/karpathy/llm.c/subscription",
  commits_url: "https://api.github.com/repos/karpathy/llm.c/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/karpathy/llm.c/git/commits{/sha}",
  comments_url: "https://api.github.com/repos/karpathy/llm.c/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/karpathy/llm.c/issues/comments{/number}",
  contents_url: "https://api.github.com/repos/karpathy/llm.c/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/karpathy/llm.c/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/karpathy/llm.c/merges",
  archive_url:
    "https://api.github.com/repos/karpathy/llm.c/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/karpathy/llm.c/downloads",
  issues_url: "https://api.github.com/repos/karpathy/llm.c/issues{/number}",
  pulls_url: "https://api.github.com/repos/karpathy/llm.c/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/karpathy/llm.c/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/karpathy/llm.c/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/karpathy/llm.c/labels{/name}",
  releases_url: "https://api.github.com/repos/karpathy/llm.c/releases{/id}",
  deployments_url: "https://api.github.com/repos/karpathy/llm.c/deployments",
  created_at: "2024-04-08T16:58:11Z",
  updated_at: "2024-04-13T18:03:43Z",
  pushed_at: "2024-04-13T17:57:51Z",
  git_url: "git://github.com/karpathy/llm.c.git",
  ssh_url: "git@github.com:karpathy/llm.c.git",
  clone_url: "https://github.com/karpathy/llm.c.git",
  svn_url: "https://github.com/karpathy/llm.c",
  homepage: "",
  size: 124,
  stargazers_count: 14094,
  watchers_count: 14094,
  language: "Cuda",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: true,
  forks_count: 1339,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 42,
  license: {
    key: "mit",
    name: "MIT License",
    spdx_id: "MIT",
    url: "https://api.github.com/licenses/mit",
    node_id: "MDc6TGljZW5zZTEz",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: [],
  visibility: "public",
  forks: 1339,
  open_issues: 42,
  watchers: 14094,
  default_branch: "master",
  temp_clone_token: null,
  network_count: 1339,
  subscribers_count: 159,
} as RepositoryAPI;

describe("repositoryAdapter", () => {
  it("should return Adapter object", () => {
    const input = repoApi;
    const output: Repository = {
      id: 783833344,
      isPrivateRepository: false,
      name: "llm.c",
      repoURL: "https://github.com/karpathy/llm.c",
      ownerURL: "https://github.com/karpathy",
      ownerName: "karpathy",
      ownerAvatarURL: "https://avatars.githubusercontent.com/u/241138?v=4",
      starsQuantity: 14094,
    };

    expect(repositoryAdapter(input)).toStrictEqual(output)
  });
});
