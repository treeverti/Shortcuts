import { useState, useEffect } from 'react';
import Papa from "papaparse";

export function FileBrowser({setFileInfoValue}){
    const [files, setFile] = useState(null);

    const onFileChangeHandler = event => {
        var file = event.target.files;
        setFile(file);
        parseFile(file);
    };

    const parseFile = event => {
        if(!files){
            console.log("Valid file was not entered");
            return null;
        }

        const reader = new FileReader();

        for(let file of files){
            let temp = [];
            temp.name = file.name;
            reader.onload = async({target}) => {
                const csv = Papa.parse(target.result, {header: true});
                const parsedData = csv?.data;
                setFileInfoValue(parsedData);
            };
            reader.readAsText(file);
        }

/*        for(let i=0; i<files.length; i++){
            
            if(files[i].name.includes(".csv") === -1){
                return "File must be csv file";
            }

            var file = files[i];
            reader.onload = async({target}) => {
                
                console.log(target);
                const csv = Papa.parse(target.result, {header: true})
                const parsedData = csv?.data;
                const rows = Object.keys(parsedData[0]);
                
                const columns = Object.values(parsedData[0]);
                const res = rows.reduce((acc, e, i) => {
                    return [...acc, [[e], columns[i]]];
                }, []);
                setFileInfoValue(res);
            };
            reader.readAsText(file);
        }*/
    };

    useEffect(() => {
        parseFile();
    });

    return (
        <input type="file" onChange={e=>onFileChangeHandler(e)}></input>
    );
}