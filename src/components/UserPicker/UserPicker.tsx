import React, {
    useState,
    useEffect,
    ChangeEvent,
    useRef,
    useContext,
} from "react";
import "./UserPicker.css";
import { GitHubApi } from "../../service";
import { useDetectClickOutside, useInputDebounce } from "../../hooks";
import { Loader, Pagination } from "..";
import { UserContext } from "../../contexts";
import { REQUEST_USERS_LIMIT } from "../../constants";
import { TUsersData } from "../../types";

const initUsersData: TUsersData ={
    items: [],
    incomplete_results: false,
    total_count: 0,
};

const UserPicker = () => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchStr, setSearchStr] = useState("");
    const [page, setPage] = useState(1);
    const [usersList, setUsersList] = useState<TUsersData>(initUsersData);
    const userPickerRef = useRef<HTMLDivElement>(null);
    const { setUser } = useContext(UserContext);
    const debouncedInput = useInputDebounce(searchStr, 500);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setPage(1);
        setSearchStr(e.target.value);
    };

    const deactivate = () => {
        if (userPickerRef.current) {
            userPickerRef.current.classList.remove("user-picker_active");
        }
        // INFO: waiting while animation finished
        setTimeout(() => setIsActive(false), 500);
    };

    useDetectClickOutside(userPickerRef, deactivate);

    useEffect(() => {
        if (!debouncedInput) {
            setUsersList(initUsersData);

            return;
        }

        const searchUsers = async (): Promise<void> => {
            setIsLoading(true);
            const users = await GitHubApi.searchUsers(debouncedInput, page);

            if (users) {
                setUsersList(users);
            }

            setIsLoading(false);
        };
        searchUsers();
    }, [debouncedInput, page]);

    return(
        <div
            className={`user-picker ${isActive && "user-picker_active"}`}
            ref={userPickerRef}
        >
            <input
                className={`user-picker-search ${isActive && "user-picker-search_active"}`}
                placeholder="Search and choose..."
                type="text"
                value={searchStr}
                onFocus={() => setIsActive(true)}
                onChange={inputChangeHandler}
            />
            {isActive &&
                <div className="absolute bg-white w-full border rounded-b-md z-10">
                    {usersList.items.map((user) => 
                        <div
                            key={user.id}
                            className="user-picker-list-item"
                            onClick={() => setUser(user)}
                        >
                            <div className="user-picker-list-item-icon" />
                            {user.login}
                        </div>
                    )}
                    <div className="p-2">
                        {isLoading &&
                            <div className="user-picker-loader">
                                <Loader />
                            </div>
                        }
                        {!isLoading && !!usersList.items.length &&
                            <Pagination
                                total={usersList.total_count}
                                page={page}
                                perPage={REQUEST_USERS_LIMIT}
                                onChange={setPage}
                            />
                        }
                        {!isLoading && !usersList.items.length &&
                            "No users..."
                        }
                    </div>
                </div>
            }
        </div>
    )
};

export default UserPicker;
