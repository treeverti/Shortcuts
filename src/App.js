import './App.css';
import { useState, useEffect } from 'react'
import {Select} from './Select.js'
import {Update} from './Update.js'
import {Insert} from './Insert.js'
import {Delete} from './Delete.js'
import {Custom} from './Custom.js'
import {FileBrowser} from './FileBrowser.js'

function App() {
  const [queryType, setQueryType] = useState('');
  const [importValue, setImportValue] = useState('');
  const [query, setQueryValue] = useState();
  const [fileInfo, setFileInfoValue] = useState([]);

  function display(){
    if(queryType === "select"){
      return <Select doesImport={importValue} setQueryValue={setQueryValue} ></Select>
    } else if(queryType === "update"){
      return <Update doesImport={importValue} setQueryValue={setQueryValue}></Update>
    } else if(queryType === "insert"){
      return <Insert doesImport={importValue} setQueryValue={setQueryValue}></Insert>
    } else if(queryType === "delete"){
      return <Delete doesImport={importValue} setQueryValue={setQueryValue}></Delete>
    } else if(queryType === "custom"){
      return <Custom setQueryValue={setQueryValue}></Custom>
    }
  }

  function displayFileSelect(){
    if(importValue === "yes"){
      return <FileBrowser setFileInfoValue={setFileInfoValue}></FileBrowser>;
    } else if (importValue === "no"){
      return "";
    }
  }

  function createFileQueries(){
    let allQueries = fileInfo.map((value) => {
      let columns = Object.values(value);
      if(columns.length > 0){
        let new_query = query.replaceAll("<br />", " ");
        for(let i=0; i<columns.length; i++){
          new_query = new_query.replaceAll("<INDEX"+i+">", "'"+columns[i]+"'");
        }
        return <>
          {new_query}
          <br />
        </>;
      } else {
        return <></>;
      }
    });

    return(
      <>
        <hr />
        {allQueries.map((index) => {
          return index;
        })}
      </>
    )
  }

  useEffect(() => {
    createFileQueries();
  });


  return (
    <div className="App">
      <p>Please choose query type:</p>
      <input type="radio" id="type_select" name="type" value="select" onClick={() => setQueryType("select")}></input><label htmlFor="type_select"> Select</label>
      <br />
      <input type="radio" id="type_update" name="type" value="update" onClick={() => setQueryType("update")}></input><label htmlFor="type_update"> Update</label>
      <br />
      <input type="radio" id="type_insert" name="type" value="insert" onClick={() => setQueryType("insert")}></input><label htmlFor="type_insert"> Insert</label>
      <br />
      <input type="radio" id="type_delete" name="type" value="delete" onClick={() => setQueryType("delete")}></input><label htmlFor="type_delete"> Delete</label>
      <br />
      <input type="radio" id="type_custom" name="type" value="custom" onClick={() => setQueryType("custom")}></input><label htmlFor="type_custom"> Custom</label>
      <br />
      <br />
      <p>Are you importing info from file:</p>
      <input type="radio" id="import_yes" name="import" value="yes" onClick={() => setImportValue("yes")}></input><label htmlFor="import_yes"> Yes</label>
      <br />
      <input type="radio" id="import_no" name="import" value="no" onClick={() => setImportValue("no")}></input><label htmlFor="import_no"> No</label>
      <br />
      <br />
      <div>
        {display()}
      </div>
      <br />
      <div>
        {displayFileSelect()}
      </div>
      <div>
        {createFileQueries()}
      </div>
    </div>
  );
}

export default App;
