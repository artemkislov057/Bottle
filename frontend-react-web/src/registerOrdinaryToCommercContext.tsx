import React from "react";

let init: {
    registerOrdinaryUserToCommerc: {
        email: string;
    },
    setRegisterOrdinaryUserToCommerc: React.Dispatch<React.SetStateAction<{
        email: string;
    }>>
};

export const ContextForRegisterOrdinaryCommerc = React.createContext(
    init
);