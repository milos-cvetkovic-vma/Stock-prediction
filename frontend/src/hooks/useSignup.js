import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);  // reset the previous error

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok) {
            setIsLoading(false);
            localStorage.setItem('user', JSON.stringify(json)); // storing jwt in browser, in local storage in String!, with name user.
            dispatch({type: 'LOGIN', payload: json}); //update the authContex
        }
    }
    return {signup, isLoading, error};
} 