import { Link } from "react-router-dom";

export default function HeaderComponents() {

    return (
        <header>
            <nav>
                <Link to="/" ><iconify-icon icon="logos:github"></iconify-icon></Link>
                <div>
                    <Link to="/six" >Шесть-Приложений</Link>
                    <Link to="/temp">Текущий проект???</Link>
                    <Link to="/hook">Хуки</Link>
                </div>
            </nav>
        </header>
    )
}
