// Editable.js
import React, { useState } from "react";
import './profile.css'


function input_block(text_type = 'tagline', text, placeholder) {
    if (text_type == 'name') {
      return <h2 class = 'profName'>
      {text || placeholder || "Editable content"}
    </h2>;
    }
    return <span class = 'profTagline'>
    {text || placeholder || "Editable content"}
  </span>;
  }
// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
  text,
  type,
  text_type,
  placeholder,
  children,
  ...props
}) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
// Exercise: It can be made dynamic by accepting initial state as props outside the component 
  const [isEditing, setEditing] = useState(false);

// Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
  };

/*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
*/
  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}>
        {input_block(text_type, text, placeholder)}
          {/* <h2>
            {text || placeholder || "Editable content"}
          </h2> */}
        </div>
      )}
    </section>
  );
};

export default Editable;