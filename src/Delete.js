import { useState } from 'react'

export function Delete({doesImport, setQueryValue}) {
    const [tableName, setTableName] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldValues, setFieldValues] = useState('');

    const onTableChangeHandler = event => {
        setTableName(event.target.value);
    }

    const onFieldChangeHandler = event => {
        setFieldName(event.target.value);
    }

    const onFieldValueChangeHandler = event => {
        var value = event.target.value;
        var id = event.target.id;
        if(id==="fieldValues"){
            setFieldValues(value);
            createQueryValue(value);
        } else {
            createQueryValue(fieldValues);
        }

    }

    function createQueryValue(value){
        setQueryValue("DELETE FROM "+tableName+"<br />WHERE "+fieldName+" = "+((doesImport === "yes") ? "<INDEX"+value+">" : "'"+value+"'")+";");
    };
    
    return (
        <>
            Table: <input id="tableName" value={tableName} onChange={e=>onTableChangeHandler(e) }/>
            <br />
            Field: <input id="fieldName" value={fieldName} onChange={e=>onFieldChangeHandler(e) } />
            <br />
            Values: <input id="fieldValues" value={fieldValues} type={(doesImport === "yes") ? "number" : "text" } onChange={e=>onFieldValueChangeHandler(e) } />
            <br />{doesImport}
            <br />
            <div className="Delete">
                DELETE FROM {tableName}<br />
                WHERE {fieldName} IN ({(doesImport === "yes") ? "<INDEX"+fieldValues+">" : fieldValues});
            </div>
        </>
    );
  }
  
  