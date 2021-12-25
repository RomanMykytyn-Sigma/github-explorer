import React from "react";
import { UserPicker } from "..";

const Header = () => {
    return(
        <header className="flex items-center bg-zinc-800 h-16 px-8 py-4">
            <div className="h-8 w-8 mr-4">
                <img src="/github-logo.png" alt="GitHub Logo"/>
            </div>
            <UserPicker />
            <span className="ml-4 text-white font-semibold tracking-wider">
                Github Explorer
            </span>
        </header>
    )
};

export default Header;
