import { useEffect } from "react";
import { useState } from "react";

const switchSearch = ['All', 'Activ', 'Completed'];
export default function ToDoList() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("list-app-data"));
        if (savedNotes) {
            setPosts(savedNotes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("list-app-data", JSON.stringify(posts));
    }, [posts]);



    const [search, setSearch] = useState('');
    const [activSearch, setActivSearch] = useState(0);

    const creatPostFun = () => {
        let time = Date.now();
        setPosts([...posts, { id: time, name: search, isEnd: false }]);
    }
    const delPostFun = (item) => {
        setPosts(() => (posts.filter(p => p.id !== item.id)));
    }

    const rerender = (item) => {
        if (item.isEnd === false) {
            setPosts(() => (posts.map((p) => (p.id === item.id) ? { id: item.id, name: item.name, isEnd: true } : p)))
        } else {
            setPosts(() => (posts.map(p => (p.id === item.id) ? { id: item.id, name: item.name, isEnd: false } : p)))
        }
    }

    const setClasses = (item) => {
        const classLi = [];
        if (item.isEnd) {
            classLi.push("liTarget")
        }
        if (item.isEnd && activSearch === 1) {
            classLi.push("displayNone")
        }
        if (!item.isEnd && activSearch === 2) {
            classLi.push("displayNone")
        }
        return classLi.join(' ');
    }


    return (
        <section className="toDoListSection">
            <div className="wrapper toDoListDiv">
                <h1>ToDoList { }</h1>
                <div>
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Введите текст" />
                    <button onClick={creatPostFun}>Создать</button>
                </div>
                <ul>
                    {
                        posts.length ?
                            posts.map((item, index) =>
                                <li className={setClasses(item)} key={index + 1}><p onClick={() => rerender(item)}>id - {item.id}, {item.name}</p><span onClick={() => delPostFun(item)}>X</span></li>
                            )
                            :
                            <h2>Список пуст</h2>
                    }
                </ul>
                <div className="bottomList">
                    <p>{posts.length} items</p>
                    <div>
                        {
                            switchSearch.map((item, index) =>
                                <span key={index} onClick={() => setActivSearch(() => index)}
                                    className={activSearch === index ? "activSearchList" : ''}>{item}</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}