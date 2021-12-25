import React from "react";
import { TUser } from "../types";

interface IUserContext {
    user: TUser | undefined;
    setUser: (user: TUser | undefined) => void;
}

const UserContext = React.createContext<IUserContext>({
    user: undefined,
    setUser: () => {},
});

export default UserContext;
