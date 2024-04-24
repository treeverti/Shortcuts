import { useState } from 'react'

export function Custom({setQueryValue}) {
    const [areaValue, setAreaValue] = useState('');

    const onAreaChangeHandler = event => {
        setAreaValue(event.target.value);
        setQueryValue(event.target.value);
    }
    
    return (
        <>
            <textarea id="customQuery" value={areaValue} onChange={(e=>onAreaChangeHandler(e))}></textarea>
            <br />
            <div className="Custom">
                {areaValue}
            </div>
        </>
    );
  }
  
  