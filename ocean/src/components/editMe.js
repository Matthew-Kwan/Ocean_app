import React from "react";
import Editable from "./Editable";
import './profile.css'

function EditMe(item, setUser, text_type) {
  // State for the input
//   const [task, setTask] = useState("");

  /*
    Enclose the input element as the children to the Editable component to make it as inline editable.
  */
  let toChange = ""
  let style = ""
  // const update
  if (text_type == 'name'){
    toChange = item.name
    style = "headerinput"
  } else if (text_type == 'tagline'){
    toChange = item.tagline
  } else{
    toChange = item.tagline
  }
  
  return (
    <Editable
      text={toChange}
      placeholder="Add a tagline for yourself"
      type="input"
      text_type = {text_type}
    >
      <input
        class = {style}
        id='fname'
        type="text"
        // text_type = {text_type}
        name={text_type}
        placeholder="Write a task name"
        value={toChange}
        // onChange={e => setUser({item: e.target.value})}
        onChange={e => setUser({...item, [e.target.name]: e.target.value})}
        
      />
    </Editable>
  );
}



export default EditMe;