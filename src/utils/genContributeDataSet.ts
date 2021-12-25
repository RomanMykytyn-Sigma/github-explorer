import { MONTHS_IN_YEAR } from "../constants";
import { TChartDataset, TContributeData } from "../types";

const genContributeDataSet = (
    contributes: TContributeData,
    ): TChartDataset | undefined => {
    const yearAgoDate = new Date(new Date().setMonth(new Date().getMonth() - 11));
    const yearAgoTimestamp = Math.floor(yearAgoDate.getTime() / 1000);

    if (!Array.isArray(contributes)) {
        return;
    }

    //INFO: generate an array of objects with month name and zero value
    let initData = MONTHS_IN_YEAR.map((month) => {
        return { label: month, value: 0 };
    });

    //INFO: count contributes which no older than 1 year and set them for appropriate month
    contributes.forEach((author) => {
        author.weeks.forEach((week) => {
            if (week.w && week.w >= yearAgoTimestamp && week.c) {
                const monthNumber = new Date(week.w * 1000).getMonth();
                initData[monthNumber].value += week.c;
            }
        });
    });

    //INFO: sort array - current month should be the last one
    const tempArr = initData.splice(0, new Date().getMonth() + 1);
    initData.push(...tempArr);

    return {
        labels: initData.map((month) => month.label),
        datasets: [
            {
                label: "Contributions",
                data: initData.map((month) => month.value),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    }


};

export default genContributeDataSet;