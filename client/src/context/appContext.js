import { createContext, useContext, useReducer, useState } from "react";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, setState] = useReducer(initialState);
    return (
        <AppContext.Provider value={{ ...state, }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext };
