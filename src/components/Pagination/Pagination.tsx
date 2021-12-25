import React from "react";

interface PaginationProps {
    total: number;
    page: number;
    perPage: number;
    onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({total, page, perPage, onChange}) => {
    const startNumber = (page - 1) * perPage + 1;
    const sum = page * perPage;
    const endNumber = sum > total ? total : sum;

    const prevDissabled = page === 1;
    const nextDissabled = sum >= total;

    const incrementPage = () => {
        if (nextDissabled) {
            return;
        }

        onChange(page + 1);
    };

    const decrementPage = () => {
        if (prevDissabled) {
            return;
        }

        onChange(page - 1);
    };

    return (
        <div className="flex border rounded-full items-center overflow-hidden">
            <div
                className="border-r grow-0"
                onClick={decrementPage}
            >
                <img
                    alt="Previous page"
                    src="./left-arrow.svg"
                    className={`${prevDissabled ? "opacity-50" : "cursor-pointer hover:bg-zinc-300"}`}
                />
            </div>
            <div className="grow text-center h-full">
                {startNumber} / {endNumber} of {total}
            </div>
            <div
                className="border-l grow-0"
                onClick={incrementPage}
            >
                <img
                    alt="Next page"
                    src="./right-arrow.svg"
                    className={`${nextDissabled ? "opacity-50" : "cursor-pointer hover:bg-zinc-300"}`}
                />
            </div>
        </div>
    );
}

export default Pagination;
