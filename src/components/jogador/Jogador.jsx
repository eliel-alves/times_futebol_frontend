import { useState, useEffect } from 'react';
import config from '../../Config';
import JogadorContext from './JogadorContext';
import Table from './Table';
import Form from "./Form";

function Posicao() {

    const [alert, setAlert] = useState({ status: "", message: "" });
    const [objectList, setObjectList] = useState([]);
    const [timesList, setTimesList] = useState([]);
    const [posicoesList, setPosicoesList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [object, setObject] = useState({
        codigo: "", nome: "", numero_camisa: "", time: "", posicao: "",
    });

    const getTimes = async () => {
        await fetch(`${config.enderecoapi}/times`)
            .then(response => response.json())
            .then(data => setTimesList(data))
            .catch(err => console.log('Erro ' + err));
    }

    const getPosicoes = async () => {
        await fetch(`${config.enderecoapi}/posicoes`)
            .then(response => response.json())
            .then(data => setPosicoesList(data))
            .catch(err => console.log('Erro ' + err));
    }

    const getJogadores = async () => {
        await fetch(`${config.enderecoapi}/jogadores`)
            .then(response => response.json())
            .then(data => setObjectList(data))
            .catch(err => console.log('Erro: ' + err));
    }

    const getById = async codigo => {
        await fetch(`${config.enderecoapi}/jogadores/${codigo}`)
            .then(response => response.json())
            .then(data => setObject(data[0]))
            .catch(err => console.log(err));
    }

    const add = async e => {
        e.preventDefault();

        // Edita um objeto já existente
        if (edit) {
            try {
                const body = {
                    codigo: object.codigo,
                    nome: object.nome,
                    numero_camisa: object.numero_camisa,
                    time: object.time,
                    posicao: object.posicao
                };
                await fetch(config.enderecoapi + '/jogadores', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)
                        setAlert({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }

        //Cria um novo objeto
        } else {
            try {
                const body = {
                    nome: object.nome,
                    numero_camisa: object.numero_camisa,
                    time: object.time,
                    posicao: object.posicao
                };

                await fetch(config.enderecoapi + '/jogadores', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)
                        setAlert({ status: json.status, message: json.message })
                    });
            } catch (err) {
                console.error(err.message);
            }
        }
        getJogadores();
    }

    const remove = async object => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/jogadores/${object.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlert({ status: json.status, message: json.message }));
                getJogadores();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObject({ ...object, [name]: value });
    }

    useEffect(() => {
        getTimes();
        getPosicoes();
        getJogadores();
    }, []);

    return (
        <JogadorContext.Provider value={
            {
                object, setObject,
                alert, setAlert,
                objectList, setObjectList,
                timesList, setTimesList,
                posicoesList, setPosicoesList,
                edit, setEdit,
                getTimes, getPosicoes,
                getJogadores, remove,
                getById,
                add,
                handleChange
            }
        }>
            <Table />
            <Form />
        </JogadorContext.Provider>
    );
}

export default Posicao;