import { usePredictionContext } from "../hooks/usePredictionContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const PredictionDetails = ({prediction}) => {
    const {dispatch} = usePredictionContext();
    const {user} = useAuthContext();
const handleClick = async () => {
    if(!user) {
        return
    }

    const response = await fetch('/api/predictions/' + prediction._id, {
        method: "DELETE",
        headers:{'Authorization' : `Bearer ${user.token}`
   } 
    })
    const json = await response.json() // the doc. we have just deleted

    if(response.ok) {
        dispatch({type: 'DELETE_PREDICTION', payload:json})
    }
};
    return (
        <div className="prediction-details">
            <h4>
                {prediction.stock}
            </h4>
            <p><strong>Prediction:</strong>{prediction.price_Prediction}</p>
            {prediction.comment && <p><strong>Comment:</strong>{prediction.comment}</p>}
            <p>{formatDistanceToNow(new Date(prediction.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span> 
        </div>
    ) // className material... se odnosi na google bibilioteku odakle je. delete je keyword za trashcan
}; //{addSuffix: true} adds ,,ago,, in the end.

export default PredictionDetails;