import { useEffect } from "react"; // sa nasim Hook-om ne treba vise useState
import PredictionDetails from '../components/predictionDetails';
import PredictionForm from "../components/predictionForm";
import { usePredictionContext } from "../hooks/usePredictionContext";
import {useAuthContext} from "../hooks/useAuthContext";
import Prices from '../components/Prices';

const Home = () => {

    const {predictions, dispatch} = usePredictionContext(); // dispatch for updating 
    const {user} = useAuthContext();

    useEffect(()=>{
        const fetchPredictions = async () => {
            const response = await fetch('/api/predictions', {headers: {
                'Authorization' : `Bearer ${user.token}`
            }})
            const json = await response.json()  // to parse a json(sent from backend)...now have an array of objects
            
            if (response.ok) {
                dispatch({type: 'SET_PREDICTIONS', payload: json}) //json - full array of predictions
            }

        }
        if(user){
            fetchPredictions();
        }
    },[dispatch, user]);

    return (
        <div>
            <Prices />
        <div className="home">
            <div className="predictions">
                {predictions && Array.isArray(predictions) && predictions.map((prediction) => (
                  <PredictionDetails key={prediction._id} prediction={prediction} />
                ))}
            </div>
            <PredictionForm />
        </div>
        </div>
    )
};

export default Home;