import ToDoList from "../components/ToDoList";
import Garland from "../components/UI/Garland";
import Countdown from "../components/Countdown";
import Messager from "../components/Messager";
import Notes from "../components/Notes";

export default function TempName() {
    return (
        <section>
            <Garland />
            <Countdown></Countdown>
            <Messager></Messager>
            <Notes></Notes>
            <ToDoList></ToDoList>
        </section>
    )
}