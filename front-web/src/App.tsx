import React, {useEffect, useState} from 'react';


const App = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        
    })

    return (
       <div className="container mt-5">
           <button type="button" className="btn btn-primary mr-5" onClick={() => setCounter( counter + 1)}>
              +
           </button>
           <span>
               {counter}
           </span>
           <button type="button" className="btn btn-primary ml-5" onClick={() => setCounter( counter - 1)}>
              -
           </button>
       </div>
    );
}

export default App;