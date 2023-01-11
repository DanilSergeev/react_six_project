import { useState, useEffect } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";


const useAddText = (textareaOnce) => {
    const [value, setValue] = useState( textareaOnce);
    const onChange = (event) => {
        setValue(() => event.target.value);
    }

    const clear = () => {
        setValue('');
    }

    let token = 200;
    if (typeof (value) === "string") {
        token = 200 - value.length;
    }

    return {
        bind: { value, onChange },
        lengthToken: token,
        value,
        clear
    }
}


export default function Notes() {
    const [notes, setNotes] = useState([
        { id: 1, text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio vel recusandae voluptatem perferendis eius provident iure necessitatibus', data: '2022.12.20', activ: false },
    ]);
    const lastNoteCrate = useAddText();
    const updateNote = useAddText();
    const [search, setSearch] = useState('');



    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes-app-data"));
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("notes-app-data", JSON.stringify(notes));
    }, [notes]);



    const delNote = (value) => {
        setNotes(() => notes.filter(p => p.id !== value))
    }
    const createNote = (value) => {
        let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        const crateObj = {
            id: Date.now(),
            text: value,
            data: utc,
            activ: false,
        }

        if (value) {
            setNotes(prev => ([...prev, crateObj]))
            lastNoteCrate.clear();
        } else {
            setNotes(prev => ([...prev, {
                id: Date.now(),
                text: "Без текста",
                data: utc,
                activ: false,
            }]))
        }
    }


    const updateNotes = (value, idIrem) => {
        let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        if (value) {
            setNotes(() => notes.map(prev => (idIrem === prev.id) ? { id: prev.id, text: value, data: utc, activ: false } : prev))
        } else {
            setNotes(() => notes.map(prev => (idIrem === prev.id) ? { id: prev.id, text: "Без текста", data: utc, activ: false } : prev))
        }
    }


    const update = (idItem) => {
        if (idItem) {
            setNotes(() => notes.map(prev => (idItem === prev.id) ? { id: prev.id, text: prev.text, data: prev.data, activ: true } : prev))
        }
    }

    return (
        <section className="NotesSection">
            <div className="wrapper">
                <h1>Заметки</h1>
                <div className="searchNotes">
                    <MyInput placeholder="Поиск" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="Notes">
                    {
                        notes.filter((note)=>note.text.toLowerCase().includes(search)).map((item) =>
                            (item.activ === false) ?
                                <div className="Note" key={item.id} >
                                    <p onClick={() => update(item.id)}>{item.text}</p>
                                    <div>
                                        <p>{item.data}</p>
                                        <button onClick={() => delNote(item.id)}><iconify-icon icon="maki:waste-basket" width="22"></iconify-icon></button>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className={`Note note-activ activModal`} key={item.id} onClick={e => e.stopPropagation()}>
                                        <textarea maxLength="200" placeholder="Введите текст" {...updateNote.bind} defaultValue={item.text}></textarea>
                                        <div>
                                            <p>Доступно символов: {updateNote.lengthToken}</p>
                                            <MyButton onClick={() => updateNotes(updateNote.value, item.id)} style={{ backgroundColor: "#fff", color: "#000" }}>Сохратить</MyButton>
                                        </div>
                                    </div>
                                    <div className="modal" onClick={() => updateNotes(updateNote.value, item.id)}></div>
                                </>
                        )

                    }
                    <div className="Note note-activ">
                        <textarea maxLength="200" placeholder="Введите текст" {...lastNoteCrate.bind}></textarea>
                        <div>
                            <p>Доступно символов: {lastNoteCrate.lengthToken}</p>
                            <MyButton onClick={() => createNote(lastNoteCrate.value)} style={{ backgroundColor: "#fff", color: "#000" }}>Сохратить</MyButton>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}