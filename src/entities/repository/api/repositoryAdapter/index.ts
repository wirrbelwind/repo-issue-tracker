import { Repository } from "../../types/Repository";
import { RepositoryAPI } from "../../types/RepositoryAPI";

export const repositoryAdapter = (repositoryAPI: RepositoryAPI): Repository => {
  return {
    id: repositoryAPI.id,
    isPrivateRepository: repositoryAPI.private,
    name: repositoryAPI.name,
    repoURL: repositoryAPI.html_url,
    starsQuantity: repositoryAPI.stargazers_count,
    ownerName: repositoryAPI.owner.login,
    ownerAvatarURL: repositoryAPI.owner.avatar_url,
    ownerURL: repositoryAPI.owner.html_url,
  };
};
