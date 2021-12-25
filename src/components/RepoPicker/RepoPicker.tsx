import React, { useState, useContext, useEffect, ChangeEvent } from "react";
import { UserContext, RepoContext } from "../../contexts";
import { GitHubApi } from "../../service";
import { SORT_REPOS_OPTIONS } from "../../constants";
import { Loader, Button } from "..";
import { saveDataAsCSV } from "../../utils";
import {
    TSort,
    TDirection,
    TReposData,
    TRepo,
} from "../../types";

const RepoPicker = () => {
    const { user } = useContext(UserContext);
    const { setRepo } = useContext(RepoContext);
    const [repos, setRepos] = useState<TReposData>([]);
    const [sortBy, setSortBy] = useState<TSort>("full_name");
    const [direction, setDirection] = useState<TDirection>("asc");
    const [isLoading, setIsLoading] = useState(false);
    const [searchStr, setSearchStr] = useState("");

    useEffect(() => {
        if (!user) {
            setRepos([]);

            return;
        }

        const getUserRepos = async (): Promise<void> => {
            setIsLoading(true);
            const repos = await GitHubApi.getUserRepos(user?.login, sortBy, direction);

            if (repos) {
                setRepos(repos);
            }

            setIsLoading(false);
        };
        getUserRepos();
    }, [user, sortBy, direction]);

    const sortChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const option = SORT_REPOS_OPTIONS.find((el) => el.value === event.target.value);

        if (option) {
            setSortBy(option?.params?.sort);
            setDirection(option?.params?.direction);
        }  
    };

    const searchRepoFilter = (repo: TRepo): boolean => {
        // INFO: filter is case insensitive
        return repo.name.toLowerCase().includes(searchStr.toLowerCase());
    };

    const clickSaveHandler = () => {
        const filteredRepos = repos.filter(searchRepoFilter);

        if (!filteredRepos.length) {
            return;
        }

        saveDataAsCSV(`${user?.login}_repos.csv`, filteredRepos);
    };

    return (
        <div className="relative flex-auto">
            <div className="flex items-center">
                <span className="mr-auto font-bold text-sm">
                    Repositories
                </span>
                <label className="text-sm mr-2">
                    <span className="mr-1">Sort</span> 
                    <select
                        className="w-16 h-7 border rounded-md"
                        onChange={sortChangeHandler}
                        disabled={!user}
                    >
                        {SORT_REPOS_OPTIONS.map((el) =>
                            <option key={el.value} value={el.value}>
                                {el.label}
                            </option>
                        )}
                    </select>
                </label>
                <Button text="Save" onClick={clickSaveHandler} />
            </div>
            <input
                type="text"
                className="w-full my-2 border rounded-md bg-gray-100 focus:bg-white px-2 py-1 text-sm"
                placeholder="Find a repository..."
                onChange={(e) => setSearchStr(e.target.value)}
            />
            <div className="absolute top-20 bottom-0 left-0 right-0 overflow-y-scroll">
                {repos.filter(searchRepoFilter).map((repo) => 
                    <div
                        key={repo.id}
                        className="flex items-center my-1"
                    >
                        <img
                            src={repo.owner.avatar_url}
                            alt="Owner avatar"
                            className="rounded-full h-4 w-4"
                        />
                        <span
                            className="ml-3 text-sm hover:underline cursor-pointer"
                            onClick={() => setRepo(repo)}
                        >
                            {repo.name}
                            {repo.language &&
                                <sup className="bg-stone-200 font-light rounded-md px-1">
                                    {repo.language}
                                </sup>
                            }
                        </span>
                    </div>
                )}
            </div>
            {isLoading &&
                <div className="absolute flex inset-0 top-20 bg-gray-100/40">
                    <div className="m-auto self-center h-24 w-24">
                        <Loader />
                    </div>
                </div>
            }
        </div>
    );
}

export default RepoPicker;
