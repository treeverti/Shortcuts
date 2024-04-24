import { useState } from 'react'

export function Select({doesImport, setQueryValue}) {
    const [tableName, setTableName] = useState('');
    const [fieldName, setFieldName] = useState('*');
    const [conditionName, setConditionName] = useState('');
    const [conditionValue, setConditionValue] = useState('');

    const onTableChangeHandler = event => {
        setTableName(event.target.value);
        createQueryValue();
    }

    const onFieldChangeHandler = event => {
        setFieldName(event.target.value);
        createQueryValue();
    }

    const onConditionChangeHandler = event => {
        setConditionName(event.target.value);
        createQueryValue();
    }

    const onConditionValueChangeHandler = event => {
        var value = event.target.value;
        var id = event.target.id;
        if(id === "conditionValue"){
            setConditionValue(value);
            createQueryValue(value);
        } else {
            createQueryValue(conditionValue);
        }
    }

    function createQueryValue(value){
        setQueryValue("SELECT "+fieldName+"<br />FROM "+tableName+"<br />WHERE "+conditionName+" = "+((doesImport === "yes") ? "<INDEX"+value+">" : "'"+value+"'")+";");
    };

  return (
    <>
        Table: <input id="tableName" value={tableName} onChange={e=>onTableChangeHandler(e) }/>
        <br />
        Field: <input id="fieldName" value={fieldName} onChange={e=>onFieldChangeHandler(e) } />
        <br />
        Condition: <input id="conditionName" value={conditionName} onChange={e=>onConditionChangeHandler(e) } />
        <br />
        Condition Value: <input id="conditionValue" type={(doesImport === "yes") ? 'number' : 'text'} value={conditionValue} onChange={e=>onConditionValueChangeHandler(e) } />
        <br />
        <br />
        <div className="Select">
            SELECT {fieldName}<br /> 
            FROM {tableName}<br />
            WHERE {conditionName} = {(doesImport === "yes") ? "<INDEX"+conditionValue+">" : conditionValue};
        </div>
    </>
  );
}
