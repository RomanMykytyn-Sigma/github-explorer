import { TSort, TDirection } from "./types";

interface ISortReportOptions {
    value: string;
    label: string;
    params: {
        sort: TSort;
        direction: TDirection;
    };
};

export const SORT_REPOS_OPTIONS: ISortReportOptions[] = [
    {
        value: "1",
        label: "Name: a -> z",
        params: {
            sort: "full_name",
            direction: "asc",
        },
    },
    {
        value: "2",
        label: "Name: z -> a",
        params: {
            sort: "full_name",
            direction: "desc",
        },
    },
    {
        value: "3",
        label: "Created: new -> old",
        params: {
            sort:"created",
            direction: "desc",
        },
    },
    {
        value: "4",
        label: "Created: old -> new",
        params: {
            sort:"created",
            direction: "asc",
        },
    },
    {
        value: "5",
        label: "Updated: new -> old",
        params: {
            sort:"updated",
            direction: "desc",
        },
    },
    {
        value: "6",
        label: "Updated: old -> new",
        params: {
            sort:"updated",
            direction: "asc",
        },
    },
    {
        value: "7",
        label: "Pushed: new -> old",
        params: {
            sort:"pushed",
            direction: "desc",
        },
    },
    {
        value: "8",
        label: "Pushed: old -> new",
        params: {
            sort:"updated",
            direction: "asc",
        },
    },
];

export const REQUEST_USERS_LIMIT = 10;

export const MONTHS_IN_YEAR = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
