import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {

    return (
        <button
            className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
