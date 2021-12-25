import React, { useContext, useEffect, useState } from "react";
import { RepoContext } from "../../contexts";
import { GitHubApi } from "../../service";
import { Bar } from "react-chartjs-2";
import { genContributeDataSet } from "../../utils";
import { TChartDataset } from "../../types";
import { Loader } from "..";

function ContributionsChart() {
    const { repo } = useContext(RepoContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dataSet, setDataSet] = useState<TChartDataset>();
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Contributions chart for the last 12 months',
          },
        },
      };

    useEffect(() => {
        if (!repo) {
            setDataSet(undefined);

            return;
        }

        const loadCotributions = async (): Promise<void> => {
            setIsLoading(true);
            const contributions = await GitHubApi.getContributionData(repo);

            if (contributions) {
                const dataSet = genContributeDataSet(contributions);
                setIsLoading(false);
                setDataSet(dataSet);
                
            } else {
                setDataSet(undefined);
            }

            setIsLoading(false);
        };
        loadCotributions();
    }, [repo]);

    return (
        <div className="relative bg-white mb-6 border rounded-xl w-2/3 pb-2">
            <div className="w-full border-b py-2 px-4 font-semibold">
            {`${repo ? repo.name : ""}/Contributions`}
            </div>
            {!repo &&
                <div className="w-full flex justify-center items-center h-36">
                    No selected repository
                </div>
            }
            {(repo && !dataSet) &&
                <div className="w-full flex justify-center items-center h-36">
                    No data
                </div>
            }
            {dataSet &&
                <div className="p-4">
                    <Bar options={options} data={dataSet} />
                </div>
            }
            {isLoading &&
                <div className="absolute flex inset-0 top-12 bg-gray-100/40">
                    <div className="m-auto self-center h-24 w-24">
                        <Loader />
                    </div>
                </div>
            }
        </div>
    );
}

export default ContributionsChart;
