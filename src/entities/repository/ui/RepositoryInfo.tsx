import { Avatar, HStack, Link, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Repository } from "../types/Repository";

interface RepositoryInfoProps {
  repo: Repository;
}

export const RepositoryInfo = ({ repo }: RepositoryInfoProps) => {
  return (
    <HStack fontSize="1.3rem">
      <Link
        href={repo.ownerURL}
        isExternal
        display="flex"
        alignItems="center"
        gap="1rem"
      >
        <Avatar src={repo.ownerAvatarURL} />
        <Text>{repo.ownerName}</Text>
      </Link>

      <IoIosArrowForward size="3rem" />

      <Link href={repo.repoURL} isExternal>
        {repo.name}
      </Link>

      <HStack>
        <FaStar />
        <Text>{repo.starsQuantity}</Text>
      </HStack>
    </HStack>
  );
};
