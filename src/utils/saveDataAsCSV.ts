import jsonexport from "jsonexport/dist";
import { TReposData } from "../types";

const saveDataAsCSV = async (
    filename: string,
    data: TReposData,
): Promise<void> => {
    const csv = await jsonexport(data);

    let link = document.createElement("a");
    link.setAttribute("href", `data:text/csv;charset=utf-8,${csv}`);
    link.setAttribute("download", filename);

    link.click();
};

export default saveDataAsCSV;