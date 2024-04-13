import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  useBoolean,
} from "@chakra-ui/react";
import { useInput } from "shared/hooks/useInput";
import { useCallback, useEffect } from "react";
import { useRepoStore, useSearchRepository } from "entities/repository";
import { GITHUB_REPO_URL_REG_EXP } from "../config/GITHUB_REPO_URL_REG_EXP";

export const SearchRepository = () => {
  const { input, onChange } = useInput();
  const [isError, setError] = useBoolean(false);

  const searchRepo = useSearchRepository();
  const repoStore = useRepoStore();

  useEffect(() => {
    if (!searchRepo.isSuccess) {
      return;
    }

    repoStore.setRepo(searchRepo.data);
  }, [searchRepo]);

  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      const matchResult = input.match(GITHUB_REPO_URL_REG_EXP);

      if (!matchResult) {
        setError.on();
        return;
      }

      setError.off();

      const username = matchResult[1];
      const repositoryName = matchResult[2];

      searchRepo.mutateAsync({
        username,
        repositoryName,
      });
    },
    [input],
  );

  return (
    <Box>
      <HStack gap="1rem" as={"form"} onSubmit={onSubmit}>
        <FormControl isInvalid={isError}>
          <FormLabel>Repository URL</FormLabel>
          <Input type="text" value={input} onChange={onChange} />

          {!isError && (
            <FormHelperText>Enter the URL to repository</FormHelperText>
          )}

          {isError && <FormErrorMessage>Wrong link</FormErrorMessage>}
        </FormControl>

        <Button type="submit" isLoading={searchRepo.isPending} w="10%">
          Search
        </Button>
      </HStack>
    </Box>
  );
};
