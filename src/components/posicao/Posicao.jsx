import { useState, useEffect } from 'react';
import config from '../../Config';
import PosicaoContext from './PosicaoContext';
import Table from './Table';
import Form from "./Form";

function Posicao() {

    const [alert, setAlert] = useState({ status: "", message: "" });
    const [objectList, setObjectList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [object, setObject] = useState({
        codigo: "", nome: ""
    });

    const get = async () => {
        await fetch(`${config.enderecoapi}/posicoes`)
            .then(response => response.json())
            .then(data => setObjectList(data))
            .catch(err => console.log('Erro: ' + err));
    }

    const getById = async codigo => {
        await fetch(`${config.enderecoapi}/posicoes/${codigo}`)
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
                    nome: object.nome
                };
                await fetch(config.enderecoapi + '/posicoes', {
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
                    nome: object.nome
                };

                await fetch(config.enderecoapi + '/posicoes', {
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
        get();
    }

    const remove = async object => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${config.enderecoapi}/posicoes/${object.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlert({ status: json.status, message: json.message }));
                get();
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
        get();
    }, []);

    return (
        <PosicaoContext.Provider value={
            {
                alert, setAlert,
                objectList, setObjectList,
                get, remove,
                object, setObject,
                edit, setEdit,
                getById,
                add,
                handleChange
            }
        }>
            <Table />
            <Form />
        </PosicaoContext.Provider>
    );
}

export default Posicao;