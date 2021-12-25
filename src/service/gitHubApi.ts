import { Octokit } from "octokit";
import { REQUEST_USERS_LIMIT } from "../constants";
import {
    TUsersData,
    TSort,
    TDirection,
    TReposData, 
    TRepo,
    TContributeData,
} from "../types";
import { FETCH_README_ERRORS } from "../enums";

const octokit = new Octokit();

const searchUsers = async (
    name: string,
    page: number,
): Promise<TUsersData | undefined> => {
    try {
        const response = await octokit.rest.search.users({
            q: name,
            per_page: REQUEST_USERS_LIMIT,
            page,
        });

        return response.data;
    } catch (error) {
        alert(`Error happened: ${error}`);
    }
};

const getUserRepos = async (
    username: string,
    sort?:  TSort,
    direction?: TDirection,
): Promise<TReposData | undefined> => {
    try {
        const response = await octokit.paginate(
            octokit.rest.repos.listForUser,
            {
                username,
                per_page: 100,
                type: "owner",
                sort,
                direction,
        });

        return response;
    } catch (error) {
        alert(`Error happened: ${error}`);
    }
};

const getReadme = async (repo: TRepo): Promise<string | undefined> => {
    try {
        const response = await octokit.rest.repos.getReadme({
            repo: repo.name,
            owner: repo.owner.login,
            mediaType: {
                format: "html",
            },
        });

        // INFO: we have to convert type because the response has
        // incorrect type if we use format="html"
        return response.data as unknown as string;
    } catch (error: any) {

        if (error?.status && error.status === 404) {
            return FETCH_README_ERRORS.NOT_FOUND;
        }

        alert(`Error happened: ${error}`);
    }
};

const getContributionData = async (
    repo: TRepo
): Promise<TContributeData | undefined> => {
    try {
        const response = await octokit.rest.repos.getContributorsStats({
            repo: repo.name,
            owner: repo.owner.login,
        });

        return response.data;
    } catch (error) {
        alert(`Error happened: ${error}`);
    }
};

const GitHubApi = {
    searchUsers,
    getUserRepos,
    getReadme,
    getContributionData,
};

export default GitHubApi;
