import classes from './MyButton.module.css';

export default function MyButton({children, ...props}) {

    return (
        <button {...props} className={classes.but}>{children}</button>
    )
}
