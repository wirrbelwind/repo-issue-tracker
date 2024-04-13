import { describe, expect, it } from "vitest";
import { issueAdapter } from ".";
import { IssueAPI } from "../../types/IssueAPI";
import { Issue } from "../../types/Issue";

const issueApi = {
  url: "https://api.github.com/repos/karpathy/llm.c/issues/111",
  repository_url: "https://api.github.com/repos/karpathy/llm.c",
  labels_url:
    "https://api.github.com/repos/karpathy/llm.c/issues/111/labels{/name}",
  comments_url:
    "https://api.github.com/repos/karpathy/llm.c/issues/111/comments",
  events_url: "https://api.github.com/repos/karpathy/llm.c/issues/111/events",
  html_url: "https://github.com/karpathy/llm.c/pull/111",
  id: 2241655944,
  node_id: "PR_kwDOLrhZAM5skl6e",
  number: 111,
  title: "Update README.md (Adding full stop)",
  user: {
    login: "pierrebrunelle",
    id: 70675979,
    node_id: "MDQ6VXNlcjcwNjc1OTc5",
    avatar_url: "https://avatars.githubusercontent.com/u/70675979?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/pierrebrunelle",
    html_url: "https://github.com/pierrebrunelle",
    followers_url: "https://api.github.com/users/pierrebrunelle/followers",
    following_url:
      "https://api.github.com/users/pierrebrunelle/following{/other_user}",
    gists_url: "https://api.github.com/users/pierrebrunelle/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/pierrebrunelle/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/pierrebrunelle/subscriptions",
    organizations_url: "https://api.github.com/users/pierrebrunelle/orgs",
    repos_url: "https://api.github.com/users/pierrebrunelle/repos",
    events_url: "https://api.github.com/users/pierrebrunelle/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/pierrebrunelle/received_events",
    type: "User",
    site_admin: false,
  },
  labels: [],
  state: "closed",
  locked: false,
  assignee: null,
  assignees: [],
  milestone: null,
  comments: 0,
  created_at: "2024-04-13T16:55:51Z",
  updated_at: "2024-04-13T17:16:10Z",
  closed_at: "2024-04-13T17:16:10Z",
  author_association: "NONE",
  active_lock_reason: null,
  draft: false,
  pull_request: {
    url: "https://api.github.com/repos/karpathy/llm.c/pulls/111",
    html_url: "https://github.com/karpathy/llm.c/pull/111",
    diff_url: "https://github.com/karpathy/llm.c/pull/111.diff",
    patch_url: "https://github.com/karpathy/llm.c/pull/111.patch",
    merged_at: null,
  },
  body: "Complete a sentence with a full-stop.\r\n\r\nHopefully, this contribution will change the world of AI.",
  reactions: {
    url: "https://api.github.com/repos/karpathy/llm.c/issues/111/reactions",
    total_count: 0,
    "+1": 0,
    "-1": 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
  timeline_url:
    "https://api.github.com/repos/karpathy/llm.c/issues/111/timeline",
  performed_via_github_app: null,
  state_reason: null,

}

describe("issueAdapter", () => {
  it("Should return a valid object (type Issue)", () => {
    const input = issueApi;
    const output: Issue = {
      github_id: 2241655944,
      authorName: "pierrebrunelle",
      commentsQuantity: 0,
      createdAt: new Date("2024-04-13T16:55:51Z"),
      serialNumber: 111,
      state: "done",
      title: "Update README.md (Adding full stop)",
      URL: "https://github.com/karpathy/llm.c/pull/111",
    };

    // @ts-ignore IssueAPI type don't have every field, but only required for the project
    expect(issueAdapter(input as IssueAPI)).toStrictEqual(output);
  });
});
