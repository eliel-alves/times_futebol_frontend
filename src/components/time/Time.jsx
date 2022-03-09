import { useState, useEffect } from 'react';
import config from '../../Config';
import TimeContext from './TimeContext';
import Table from './Table';
import Form from "./Form";

function Time() {

    const [alert, setAlert] = useState({ status: "", message: "" });
    const [objectList, setObjectList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [object, setObject] = useState({
        codigo: "", nome: "", sigla: "", ano_fundacao: 0, historia: ""
    });

    const get = async () => {
        await fetch(`${config.enderecoapi}/times`)
            .then(response => response.json())
            .then(data => setObjectList(data))
            .catch(err => console.log('Erro: ' + err));
    }

    const getById = async codigo => {
        await fetch(`${config.enderecoapi}/times/${codigo}`)
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
                    sigla: object.sigla.toUpperCase(),
                    ano_fundacao: object.ano_fundacao,
                    historia: object.historia
                };
                await fetch(config.enderecoapi + '/times', {
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
                    sigla: object.sigla.toUpperCase(),
                    ano_fundacao: object.ano_fundacao,
                    historia: object.historia
                };

                await fetch(config.enderecoapi + '/times', {
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
                await fetch(`${config.enderecoapi}/times/${object.codigo}`,
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
        <TimeContext.Provider value={
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
        </TimeContext.Provider>
    );
}

export default Time;