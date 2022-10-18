import React, {useEffect} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useState, useRef} from "react";
import './../App.css';
import TextField from '@mui/material/TextField';
import {Checkbox} from "@mui/material";
import {FormControlLabel} from "@mui/material";
import {FormGroup} from "@mui/material";
import iconRemove from './../Images/remove_item.svg'
import adminIcon from './../Images/admin-icon.svg'
import ConfirmDialogBox from "./ConfirmDialogBox"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const ToDoList = () => {
    const [toDoList, setToDoList] = useState([])
    const [showList, setShowList] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteitem, setDeleteitem] = useState("")
    const [showPopup, setShowPopup] = useState(false)

    const options = [
        'Show All', 'Finished', 'To do'
    ];
    const defaultOption = useRef(options[2]);

    useEffect(() => {
        handleOptions("",defaultOption.current)
    },[toDoList])

    const handleEnter = (event) => {
        if(event.key === "Enter") {
            if((toDoList.filter((fil) => fil.item === event.target.value).length) > 0) {
                setShowPopup(true)
            }
            else {
                let obj = [
                    ...toDoList,{
                        item : event.target.value,
                        status : "not done"
                    }]

                setToDoList(obj)
            }
        }
        else {
            setShowPopup(false)
        }
    }

    const handleOptions = (event,option) => {
        defaultOption.current = option? option : event.value
        if(defaultOption.current === "Show All") {
            setShowList(toDoList.map((list) => list.item))
        }
        else if(defaultOption.current === "Finished") {
            setShowList(toDoList.map((list) => {
                if(list.status === "done"){
                    return list.item
                }
            }))
        }
        else {
            setShowList(toDoList.map((list) => {
                if(list.status === "not done"){
                    return list.item
                }
            }))
        }
    }

    const handleClose = () => {
        setShowConfirm(false)
        setDeleteitem("")
    }

    const handleConfirm = () => {
        setShowConfirm(false)
        let temp = toDoList.filter((todo) => todo.item !== deleteitem )
        setToDoList(temp)
        setDeleteitem("")
        handleOptions("",defaultOption.current)
    }

    const handleDelete = (event, delItem) => {
        setShowConfirm(true)
        setDeleteitem(delItem)
    }

    const handleDone = (event) => {
        toDoList.map((todo) => {
            if(todo.item === event.target.value ){
                if (event.target.checked) {
                    todo.status = "done"
                }
                else {
                    todo.status = "not done"
                }
            }

        })
        handleOptions("",defaultOption.current)
    }

    return (
        <div className="outer-box">
            <div className="top-section">
                <div>
                    <img src={adminIcon} width='24px' style={{cursor:'pointer'}} alt=""  />
                </div>
                <div className="drowdown">
                    <Dropdown options={options} onChange={handleOptions} value={defaultOption.current} placeholder="Select an option" />
                </div>
            </div>
            {showList ?
                <div className="list-section">
                    {showList.map((el, index) => (
                        <div className="list-item">
                            <table>
                                <FormGroup aria-label="position" style={{display:"inline-block"}}>
                                    <tr>
                                        <td style={{width:"150px"}}>
                                            <FormControlLabel
                                                value={el}
                                                control={<Checkbox onClick={handleDone}/>}
                                                label={el}
                                                labelPlacement="end"
                                                style={{paddingRight:"20px"}}
                                            />
                                        </td>
                                        <td>
                                            <a>
                                                <img src={iconRemove} width='24px' style={{cursor:'pointer'}} alt="" onClick={event => handleDelete(event, el)}  />
                                            </a>
                                        </td>
                                    </tr>
                                </FormGroup>
                            </table>

                        </div>
                    ))}
                </div> : ''
            }
            <div className="input-section">
                <TextField id="filled-basic" label="Enter here" variant="filled" onKeyDown={handleEnter}/>
            </div>
            <div>
                <ConfirmDialogBox handleClose={handleClose} handleConfirm={handleConfirm} open={showConfirm} />
            </div>
            {
                showPopup ?
                <Popup trigger={<button>Already in to do list.</button>} position="right center">
                    <div>This item is already existing in to do list.</div>
                </Popup> : ''
            }
        </div>
    )
}

export default ToDoList;








