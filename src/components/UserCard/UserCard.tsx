import React, { useContext } from "react";
import { UserContext } from "../../contexts";

const UserCard = () => {
    const { user } = useContext(UserContext);

    return(
        <div className="border-b-2 pb-2 mb-6">
            {!user ?
                <span className="italic text-slate-600">
                    Please, select a user
                </span>
            :
                <div className="flex items-center">
                    <img
                        src={user.avatar_url}
                        alt="User avatar"
                        className="w-10 h-10"
                    />
                    <span className="font-bold ml-2">
                        {user.login}
                    </span>
                </div>
            }
        </div>
    )
};

export default UserCard;
