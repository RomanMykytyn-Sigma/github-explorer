import React, { useContext, useEffect, useState } from "react";
import { RepoContext } from "../../contexts";
import { GitHubApi } from "../../service";
import { Loader } from "..";
import { FETCH_README_ERRORS } from "../../enums";
import "./ReadmeViewer.css";
import "github-markdown-css";

const ReadmeViewer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [readme, setReadme] = useState<string>("");
    const { repo } = useContext(RepoContext);

    useEffect(() => {
        if (!repo) {
            setReadme("");

            return;
        }

        const getReadme = async (): Promise<void> => {
            setIsLoading(true);
            const readme = await GitHubApi.getReadme(repo);

            if (readme) {
                setReadme(readme);
            } else {
                setReadme("");
            }

            setIsLoading(false);
        };
        getReadme();
    }, [repo]);

    return (
        <div className="relative bg-white border rounded-xl w-2/3">
            <div className="w-full border-b py-2 px-4 font-semibold">
                {`${repo ? repo.name : ""}/README.md`}
            </div>
            {!repo &&
                <div className="w-full flex justify-center items-center h-36">
                    No selected repository
                </div>
            }
            {(repo && !readme) &&
                <div className="w-full flex justify-center items-center h-36">
                    No data
                </div>
            }
            {(readme !== FETCH_README_ERRORS.NOT_FOUND)
                ?   <div
                        dangerouslySetInnerHTML={{ __html: readme }}
                        className="pb-2"
                    />
                :   <div className="w-full h-36 flex justify-center items-center">
                        Readme.md not found
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

export default ReadmeViewer;
