import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import { Octokit } from "octokit";

//GitHub API types
const octokit = new Octokit();

export type TUsersData = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.search.users
>;

export type TUser = TUsersData["items"][number];

export type TReposData = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.listForUser
>;

export type TContributeData = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.getContributorsStats
>;

export type TSort = "created" | "updated" | "pushed" | "full_name";

export type TDirection = "asc" | "desc";

export type TRepo = TReposData[number];

//Utils types
export type TChartDataset = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
};
