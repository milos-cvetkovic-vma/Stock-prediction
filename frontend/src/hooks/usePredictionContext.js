import { PredictionContext } from "../context/predictionContex";
import { useContext } from "react";


export const usePredictionContext = () => {
    const context = useContext(PredictionContext)

    if (!context) {
        throw Error ('usePredictionContext must be used inside an PredictionContextProvider !')
    }

    return context
};