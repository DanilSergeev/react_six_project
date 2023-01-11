import classes from './MyModal.module.css';

export default function MyModal({modalVisibl, setModalVisibl, children}) {
    const rootClasses = [classes.mod];
    if(modalVisibl){
        rootClasses.push(classes.modAction);
    }
    
    return (
        <div className={rootClasses.join(' ')} onClick={()=>setModalVisibl(false)}>
            <div className={classes.modWindow} onClick={(e)=> e.stopPropagation()} >{children}</div>
        </div>
    )
}
