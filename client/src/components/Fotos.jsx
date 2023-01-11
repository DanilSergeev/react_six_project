import { useState } from "react";
import FadeFotos from "./FadeFotos";

export default function Fotos({ fotos }) {

    const [serchFoto, setSerchFoto] = useState('');

    const tegs = ['Все', 'Море', 'Горы', 'Архитектура', 'Города'];

    // https://639482ce86829c49e81edd89.mockapi.io/Fotos?category=1
    return (
        <section className="IMGSesion">
            <div className="wrapper">
                <h2>Моя колекция фотографий</h2>
                <div className="tegs">
                    <ul>
                        {
                            tegs.map((teg, index) =>
                                <li onClick={()=>fotos.setCategoryId(index)} className={fotos.categoryId ===index?'activTeg':''} key={teg}>{teg}</li>
                            )
                        }
                    </ul>
                    <input type="text" placeholder="Поик по названию" value={serchFoto} onChange={e => setSerchFoto(e.target.value)} />
                </div>
                <div className="displayFotos">
                    {
                        fotos.isLoadingFoto?
                        <h1>Загрузка...</h1>
                        :
                        fotos.fotos.filter(obj => {
                            return obj.name.toLowerCase().includes(serchFoto.toLowerCase());
                        }).map((foto, index) =>
                            <FadeFotos key={index + 1} name={foto.name} imgs={foto.photos}></FadeFotos>
                        )
                    }
                </div>
                <ul className="paginationIMG">
                    {
                        [...Array(3)].map((_,i)=>
                        <li key={i+1} className={fotos.pageFoto===i+1?'paginationLiActiv':''} onClick={()=>fotos.setPageFoto(i+1)}>{i+1}</li>
                        )
                    }
                </ul>
            </div>
        </section>
    )
}