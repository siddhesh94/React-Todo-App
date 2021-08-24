import React, { useState, useEffect } from "react";
import "./style.css";

//Getting Values from Local Storage
const getLocalData = () => {
  const list = localStorage.getItem("TodoList");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggle, setToggle] = useState(false);

  //Getting Input Values
  const onInputChange = (event) => {
    setInputData(event.target.value);
  };

  //Adding Items
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && toggle) {
      setItems(
        items.map((item) => {
          if (item.id === isEditItem) {
            return { ...item, name: inputData };
          }
          return item;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggle(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
      console.log(inputData);
      console.log(myNewInputData);
    }
  };

  //Delete Items
  const deleteItem = (index) => {
    const updatedItem = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setItems(updatedItem);
    console.log("deleted");
  };

  //Remove All Items
  const removeAllItems = () => {
    return setItems([]);
  };

  //Setting Value in  Local storage
  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(items));
  }, [items]);

  //Edit Item
  const editItem = (index) => {
    const editedItem = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(editedItem.name);
    setIsEditItem(index);
    setToggle(true);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="https://raw.githubusercontent.com/thapatechnical/complete_react2021/76b2900dfaba3dc794d7f14f84c6fa4315a030bd/public/images/todo.svg"
              alt="todo"
            />
            <figcaption>Add Your List Here!</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items..."
              className="form-control"
              onChange={onInputChange}
              value={inputData}
            />
            {toggle ? (
              <i
                className="fa fa-arrow-circle-right add-btn"
                onClick={addItem}
              ></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
            {/* <i className="fa fa-plus add-btn" onClick={addItem}></i> */}
          </div>
          <div className="showItems">
            {items.map((item) => {
              return (
                <div className="eachItem" key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(item.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(item.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllItems}
            >
              <span>CHECKLIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
