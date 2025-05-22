import { useState } from "react";
import { usePredictionContext } from "../hooks/usePredictionContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {z} from "zod";
import {fromZodError} from "zod-validation-error";

const predictionSchema = z.object({
    stock : z.string().min(1, { message: "Stock symbol must be at least 1 character long" }).max(5, { message: "Stock symbol must be at most 5 characters long" }),
    price: z.string().refine((val) => ["up", "down"].includes(val.toLowerCase()), {
        message: 'Prediction must be either "up" or "down"'}) ,
    comment: z.string().max(100, { message: "Comment must be at most 100 characters long" }).optional()
});


const PredictionForm = () => {
    const {dispatch}= usePredictionContext();
    const {user} = useAuthContext();

    const[stock, setStock]= useState('');
    const[price, setPrice]= useState('');
    const[comment, setComment]= useState('');

    const[error, setError]= useState(null);
    const[emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        

        if(!user) {
            setError('You must be logged in!')
            return
        }
        const predictionData = {stock,price,comment};
        const validationData = predictionSchema.safeParse(predictionData); // 

        if (validationData.success) {
        console.log(validationData.data); 
        } else {
        const formattedError = fromZodError(validationData.error); // full error
        console.log(formattedError); 
        setError(formattedError.message);
        return
        }

        //if (!((price.trim().toLowerCase() == 'up')) && !((price.trim().toLowerCase() == 'down')) ) {
            //setError('Prediction can be Up or Down')
            //return
        //}

        const prediction = {stock,price_Prediction: price,comment};

        

        const response = await fetch('/api/predictions', {
            method:'POST',
            body: JSON.stringify(prediction),
            headers:{'content-type':'application/json',
                     'Authorization' : `Bearer ${user.token}`
            } 
        })
        const json = await response.json()

        if(!response.ok) {
            //setError(json.error);
            //setEmptyFields(json.emptyFields)
            setError('Bad validation from backend !');
            setEmptyFields(emptyFields)
        }
        if(response.ok) {
            setStock('');
            setPrice('');
            setComment('');
            setError(null);
            setEmptyFields([])
            console.log('New prediction added', prediction);
            dispatch({type:'CREATE_PREDICTION', payload: json})  // we want to dispatch it here when the response is ok.
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3>Add new prediction</h3>
            <label>Stock name</label>
            <input 
                type="text"
                onChange={(e) => setStock(e.target.value)}
                value = {stock}
                className={emptyFields.includes('stock') ? 'error' : ''}
             />
            <label>Price action (Up or Down)</label>
            <input 
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value = {price}
                className={emptyFields.includes('price_Prediction') ? 'error' : ''}
             />
            <label>Comment (reason for opinion)</label>
            <input 
                type="text"
                onChange={(e) => setComment(e.target.value)}
                value = {comment}
             />
             <button>Predict!</button>
             {error && <div className="error">{error}</div>}
        </form>
    )
};

export default PredictionForm;