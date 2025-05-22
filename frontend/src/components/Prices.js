import { useEffect, useState } from 'react'; // React, 

  
function Prices() {
  const [data, setData] = useState(null);

  useEffect(() => {
     // Fetch the file from the public folder
 fetch('/price_Sp500.json') // '/Sp500.json' is relative to the public folder
 .then((response) => response.json()) // Parse json
 .then((data) => {
   setData(data); // Set the fetched data to state
 })
 .catch((error) => {
   console.error('Error fetching the JSON file:', error);
 });
  }, []);

  return (
    <div className='prices'>
      <h1><strong>Sp500 last price:</strong></h1>
      {data && data.length > 0 ? (
      data.map((price, index) => (
        <span key={index}>{price}</span>
      ))
    ) : (
      <span>Wait, please...</span>
    )}
    </div>
  );
}


export default Prices;