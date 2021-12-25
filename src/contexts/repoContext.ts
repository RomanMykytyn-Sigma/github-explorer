import React from "react";
import { TRepo } from "../types";

interface IRepoContext {
    repo: TRepo | undefined;
    setRepo: (repo: TRepo | undefined) => void;
}

const RepoContext = React.createContext<IRepoContext>({
    repo: undefined,
    setRepo: () => {},
});

export default RepoContext;
