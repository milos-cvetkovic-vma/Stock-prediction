import { useAuthContext } from "./useAuthContext";
import { usePredictionContext } from "./usePredictionContext";

//update gobal state and delete token !
export const useLogout = () => {   
    const {dispatch} = useAuthContext();
    const {dispatch: predDispatch} = usePredictionContext();

    const logout = () => {
        localStorage.removeItem('user'); // remove token from localStorage
        dispatch({type:'LOGOUT'}); // dispatch logout action, no need for payload (null)
        predDispatch({type: 'SET_PREDICTIONS', payload: null});
    }
    return {logout}  //returning an object {logout : [function]}
};

