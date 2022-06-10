import React, { createContext, useContext } from "react";

let init :{
    isLogin: boolean,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
    isCommercial: boolean
}

export const ContextLogin = React.createContext(init);