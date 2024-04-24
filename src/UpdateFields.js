import { useState } from 'react'

export function UpdateFields({IdValue, getFieldDetails}) {
    const [fieldName, setFieldName] = useState('');
    const [fieldValue, setFieldValue] = useState('');

    const onFieldChangeHandler = event => {
        let name = event.target.value
        setFieldName(name);
        getFieldDetails({ 'id': IdValue, 'name': name, 'value': fieldValue });
    }

    const onFieldValueChangeHandler = event => {
        let value = event.target.value;
        setFieldValue(value);
        getFieldDetails({ 'id': IdValue, 'name': fieldName, 'value': value });
    }

    const getFieldNameId = () => {
        return "fieldName"+IdValue;
    };

    const getFieldValueId = () => {
        return "fieldValue"+IdValue;
    };

    return <>
            Field: <input id={getFieldNameId()} value={fieldName} onChange={e=>onFieldChangeHandler(e) } />
            <br />
            Field Values: <input id={getFieldValueId()} value={fieldValue} onChange={e=>onFieldValueChangeHandler(e) } />
            <br />
    </>
}