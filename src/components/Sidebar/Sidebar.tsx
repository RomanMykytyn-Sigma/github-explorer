import React from "react";
import { UserCard, RepoPicker } from "..";

const Sidebar = () => {
    return(
        <aside className="flex flex-col w-96 p-6 bg-white flex-none">
            <UserCard />
            <RepoPicker />
        </aside>
    )
};

export default Sidebar;
