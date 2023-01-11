import { useState } from "react";
import MyButton from "./UI/button/MyButton";
import SkeletonLoader from "./UI/skeleton/SkeletonLoader";

export default function Social({ props }) {
    const [isList, setIsList] = useState(true);
    return (
        <section className="SocialSection">
            {
                isList ?
                    <div className="wrapper">
                        <input type="text" value={props.searchValue} onChange={e => props.setSearchValue(e.target.value)} placeholder="🔎︎ Поиск" />
                        {
                            props.isLoading ?
                                <div style={{ marginTop: "1vh" }}>
                                    <SkeletonLoader />
                                    <SkeletonLoader />
                                    <SkeletonLoader />
                                </div>
                                :
                                <ul>
                                    {
                                        props.users.items.filter(user => {
                                            return user.login.includes(props.searchValue);
                                        }).map((user) =>
                                            <li key={user.id}>
                                                <img className="autor" src={user.avatar_url} alt={user.login} />
                                                <div>
                                                    <h6>{user.login}</h6>
                                                    <p>{user.login}@yo.ru</p>
                                                </div>
                                                <span onClick={() => props.addUsers(user.id)}>{props.addUser.includes(user.id) ? '-' : '+'}</span>
                                            </li>
                                        )
                                    }
                                </ul>
                        }
                        {
                            props.addUser.length !== 0 ?
                                <MyButton onClick={()=>setIsList(false)}>Отправить приглошение</MyButton>
                                :
                                <p>Выбирете кого хотите пригласить</p>
                        }
                    </div>

                    :
                    <div className="wrapper">
                        <h3>{`Вы приглосили ` + props.addUser.length + ` пользователей`}</h3>
                        <div onClick={()=>setIsList(true)}>◄</div>
                    </div>
            }
        </section>
    )
}