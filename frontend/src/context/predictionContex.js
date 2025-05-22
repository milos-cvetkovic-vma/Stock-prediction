import { createContext, useReducer } from "react";

export const PredictionContext = createContext(); // creating contex

export const predictionReducer = (state, action) => { //state - state before making change, action-obj.from dispatch with type and payload property.
    switch (action.type) {
        case 'SET_PREDICTIONS':
            return {
                predictions: action.payload
            }
        case 'CREATE_PREDICTION':
            return {
                predictions: [action.payload, ...state.predictions]
            }
        case 'DELETE_PREDICTION':
            return {
                predictions: state.predictions.filter((p)=>p._id !== action.payload._id)
            }
        default: 
            return state
    }
}; // we do this in order to keep local state synchronised, to show true state without fetching all data again.

// providing contex to our components. Like regular react component, that will wrap others, rest of our app.
export const PredictionContextProvider = ({children}) => {   // children prop is whatever this component wraps. In this case app comp.
    
    const [state, dispatch] = useReducer(predictionReducer, {predictions: null});
        
    return (
        <PredictionContext.Provider value={{...state, dispatch}}>  
            {children}
        </ PredictionContext.Provider>
    ) //provide state, dispatch to be available in other components.
}; 
