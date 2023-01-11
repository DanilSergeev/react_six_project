import { useEffect, useState } from "react";
import ModalWindow from "../components/ModalWindow";
import axios from "axios";
import Social from "../components/Social";
import Calculator from "../components/Calculator";
import Fotos from "../components/Fotos";

export default function SixProjectPage() {
    const [modalVisibl, setModalVisibl] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setUsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [addUser, setAddUser] = useState([]);

    async function getUsers() {
        await axios("https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000")
            .then(function (response) {
                setUsers(response.data);
            })
            .catch(function (err) {
                console.warn(err);
            })
            .finally(() => setUsLoading(false));
    }

    useEffect(() => {
        getUsers();
    }, [isLoading]);

    const addUsers = (el) => {
        if (addUser.includes(el)) {
            setAddUser(prev => prev.filter(_el => _el !== el));
        } else {
            setAddUser([...addUser, el]);
        }
    }

    const [listMoney, setListMoney] = useState({});
    const [isLoadingCalc, setIsLoadingCalc] = useState(true);

    async function openCalcFun() {
        await axios("https://api.currencyapi.com/v3/latest?apikey=oYdnSwcwD6EJ0b9W0A1ar5Cgvy8fJZtcT0QK2X9p&currencies=EUR,USD,RUB,BTC,ETH&base_currency=USD")
            .then(function (response) {
                setListMoney(response.data.data);
            })
            .catch(function (err) {
                console.warn(err);
            }).finally(() => setIsLoadingCalc(false));
        // fH15YAsjgQoxLPWtARLfYyr309sOU6FIhaJOiy5x
        // https://api.currencyapi.com/v3/latest?apikey=fH15YAsjgQoxLPWtARLfYyr309sOU6FIhaJOiy5x&currencies=EUR,USD,RUB,BTC,ETH&base_currency=USD
        // https://currencyapi.com/docs/currency-list
    }
    useEffect(() => {
        openCalcFun();
    }, [isLoadingCalc]);


    const [isLoadingFoto, setIsLoadingFoto] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [pageFoto, setPageFoto] = useState(1);
    const [fotos, setFotos] = useState([]);
    async function getFotos() {
        await axios(`https://639482ce86829c49e81edd89.mockapi.io/Fotos?${pageFoto?"page="+pageFoto:''}&limit=3${categoryId?"&category=" + categoryId:''} `)
            .then(function (response) {
                setFotos(response.data);
            })
            .catch(function (err) {
                console.warn(err);
            }).finally(()=>setIsLoadingFoto(false));
    }

    useEffect(() => {
        getFotos();
    }, [categoryId,pageFoto]);

    // https://639482ce86829c49e81edd89.mockapi.io/Fotos
    return (
        <section>
            <ModalWindow modalVisibl={modalVisibl} setModalVisibl={setModalVisibl} ></ModalWindow>
            <Fotos fotos={{fotos,setCategoryId,categoryId,isLoadingFoto,setPageFoto,pageFoto}}></Fotos>
            <Calculator props={{ listMoney, setListMoney, isLoadingCalc }}></Calculator>
            <Social props={{ searchValue: searchValue, setSearchValue: setSearchValue, isLoading: isLoading, users: users, addUsers: addUsers, addUser: addUser, }} ></Social>
        </section>
    )
}
