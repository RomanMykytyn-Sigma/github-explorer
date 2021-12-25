import React, { useState, useEffect } from "react";
import { Header, Sidebar, ReadmeViewer, ContributionsChart } from "./components";
import { UserContext, RepoContext } from "./contexts";
import { TUser, TRepo } from "./types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

function App() {
    const [user, setUser] = useState<TUser | undefined>(undefined);
    const [repo, setRepo] = useState<TRepo | undefined>(undefined);

    useEffect(() => {
        setRepo(undefined);
    }, [user]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <RepoContext.Provider value={{ repo, setRepo }}>
                <Header />
                <div className="flex flex-auto">
                    <Sidebar />
                    <div className=" relative ml-10 w-full flex flex-col">
                        <div className="absolute py-6 inset-0 overflow-y-scroll">
                            <ContributionsChart />
                            <ReadmeViewer />
                        </div>
                    </div>
                </div>
            </RepoContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
