import { useState, useEffect } from 'react'
import { UpdateFields } from './UpdateFields.js'

export function Update({doesImport, setQueryValue}) {
    const [tableName, setTableName] = useState('');
    const [fieldCount, setFieldCount] = useState(0);
    const [fields, setFields] = useState([]);
    const [fieldDetails, setFieldDetails] = useState([]);
    const [conditionName, setConditionName] = useState('');
    const [conditionValue, setConditionValue] = useState('');

    const onTableChangeHandler = event => {
        setTableName(event.target.value);
    }

    const onConditionChangeHandler = event => {
        setConditionName(event.target.value);
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
        var getFields = printFieldDetails();
/*        document.querySelectorAll("[name='fields_span'] input").forEach(function(input) {
            let num = 0;
            // Perform operations on each input
            if(getFields === ""){
                getFields = input.value+" = ";
            } else if (num % 2 === 0){
                getFields += ", "+input.value+" = ";
            } else if (num % 2 === 1){
                getFields += input.value;
            }
            num++;
        });*/

        setQueryValue("UPDATE "+tableName+"<br />SET "+getFields+"<br /> WHERE "+conditionName+" = "
            +((doesImport === "yes") ? "<INDEX"+value+">" : "'"+value+"'")+";");
    };

    function addFields(){
        var temp_fields = fields;
        temp_fields.push(<UpdateFields IdValue={fieldCount} getFieldDetails={getFieldDetails}  ></UpdateFields>);
        setFields(temp_fields);
        var new_count = fieldCount + 1;
        setFieldCount(new_count);
    }

    function getFieldDetails(item){
        var temp_details = (fieldDetails === undefined || fieldDetails === null || fieldDetails.length < 1) ? [] : fieldDetails;
        var name = item['name'];
        var value = item['value'];
        var id = parseInt(item['id']);
        temp_details[id] = {'name': name, 'value': value};
        setFieldDetails(temp_details);
    }

    function printFieldDetails(){
        let return_str = "";
        for(let i=0; i<fieldDetails.length; i++){
            if(fieldDetails[i] === null || fieldDetails[i] === undefined)
                continue;
            if(i===0){
                return_str = fieldDetails[i]['name']+" = "+fieldDetails[i]['value'];
            } else {
                return_str += ", "+fieldDetails[i]['name']+" = "+fieldDetails[i]['value'];
            }
        }
        return return_str;
    }

    useEffect(() => {
        printFieldDetails();
    });

    return (
        <>
            Table: <input id="tableName" value={tableName} onChange={e=>onTableChangeHandler(e) }/>
            <br />
            <button id="add_fields" onClick={e=> addFields() }>+ (Fields)</button>
            <br />
            <span name="fields_span">              
            {
                fields.map((item) => {
                    return item;
                })
            }
            </span>
            Condition: <input id="conditionName" value={conditionName} onChange={e=>onConditionChangeHandler(e) } />
            <br />
            Condition Value: <input id="conditionValue" value={conditionValue} type={(doesImport === "yes") ? "number" : "text" } onChange={e=>onConditionValueChangeHandler(e) } />
            <br />
            <br />
            <div className="Update">
                UPDATE {tableName}<br />
                SET { printFieldDetails() }<br />
                WHERE {conditionName} = {(doesImport === "yes") ? "<INDEX"+conditionValue+">": conditionValue};
            </div>
        </>
    );
  }
  