import React from "react";

const Checkbox = ({ id, name, handleClick, isChecked }) => {
    return (
        <input
            type="checkbox"
            id={id}
            name={name}
            onChange={handleClick}
            checked={isChecked}
        />
    );
};

export default Checkbox;