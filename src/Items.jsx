import React, { useState } from "react";

const Items = ({ text, id, deleteId, editData }) => {
  const [tast, setTask] = useState(text);
  const [edit, setEdit] = useState(true);

  
  const changeEditContent = () => {
    setEdit((prevState) => !prevState);
  };

  
console.log(id);
  return (
    <div>
      {edit ? (
        <>
          {text}

          <button onClick={() => deleteId(id)}>DELETE</button>
          <button onClick={changeEditContent}>Edit</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={tast}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={() => editData(id, tast,changeEditContent)}>save</button>
        </>
      )}
    </div>
  );
};

export default Items;
