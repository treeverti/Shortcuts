import { useState } from 'react'

export function Insert({doesImport, setQueryValue}) {
    const [tableName, setTableName] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldValues, setFieldValues] = useState('');

    const onTableChangeHander = event => {
        setTableName(event.target.value);
    };

    const onFieldChangeHandler = event => {
        setFieldName(event.target.value);
    }

    const onFieldValueChangeHandler = event => {
        var value = event.target.value;
        var id = event.target.id;
        if(id === "fieldValueName"){
            setFieldValues(value);
            createQueryValue(value);
        } else {
            createQueryValue(fieldValues)
        }

    }

    function createQueryValue(value){
        setQueryValue("INSERT INTO "+tableName+"("+fieldName+")<br />VALUE "+value+";");
    };

    return (
        <>
            Table: <input id="tableName" value={tableName} onChange = { e=> onTableChangeHander(e)} />
            <br />
            Fields: <input id="fieldName" value={fieldName} onChange={ e=>onFieldChangeHandler(e) } />
            <br />
            Field Values: <input id="fieldValueName" value={fieldValues} onChange={ e => onFieldValueChangeHandler(e) } />
            <br />
            <br />
            <div className="Insert">
                INSERT INTO {tableName} ({fieldName})<br />
                VALUE ({fieldValues});
            </div>
        </>
    );
  }
  
  