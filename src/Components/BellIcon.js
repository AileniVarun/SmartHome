import React, { useState } from "react";
import "../Styles/BellAnimation.css"; 

const BellIcon = () => {
    const [isOff, setIsOff] = useState(false);

    const handleToggle = () => {
        setIsOff(!isOff);
    };

    return (
        <div className="bell-container" onClick={handleToggle}>
            <div className={`bell-icon ${isOff ? "off" : ""}`}></div>
            {isOff && <div className="cross-overlay">×</div>}
        </div>
    );
};

export default BellIcon;
