import React from "react";
import classes from "./MyInput.module.css";

export default function MyInput({...props}) {
    
    return (
        <input {...props} className={classes.inp} />
    )
}
