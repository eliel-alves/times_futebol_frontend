import { useContext } from 'react';
import JogadorContext from "./JogadorContext";
import Alert from '../Alert';

function Table() {
    const { setObject, alert, setAlert, objectList, remove, setEdit, getById} = useContext(JogadorContext);

    return (
        <div className="p-4">
            <div className="d-flex">
                <h3>Lista de Jogadores</h3>
                <div className="flex-grow-1"></div>
                <div className="d-inline">
                    <button type="button" className="btn btn-primary"
                            data-bs-toggle="modal" data-bs-target="#modalEdicao"
                            onClick={() => {
                                setObject({
                                    codigo: "",
                                    nome: "",
                                    numero_camisa: "",
                                    time: "",
                                    posicao: ""
                                });
                                setEdit(false);
                                setAlert({ status: "", message: "" });
                            }}>
                        Novo <i className="bi bi-file-earmark-plus"></i>
                    </button>
                </div>
            </div>
            <Alert alert={alert} />
            {objectList.length === 0 && <h4>Nenhum jogador foi encontrado! ☹️</h4>}
            {objectList.length > 0 && (
                <table className="table table-striped align-middle mt-2">
                    <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Camisa</th>
                        <th scope="col">Time</th>
                        <th scope="col">Posição</th>
                        <th scope="col" className="text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {objectList.map(object => (
                        <tr key={object.codigo}>
                            <td>{object.codigo}</td>
                            <td>{object.nome}</td>
                            <td>{object.numero_camisa}</td>
                            <td>{object.time_nome}</td>
                            <td>{object.posicao_nome}</td>
                            <td align="center">
                                <button className="btn btn-info me-2" title="Editar"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            getById(object.codigo);
                                            setEdit(true);
                                            setAlert({ status: "", message: "" });
                                        }}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remove(object); }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <caption>{objectList.length + " registro(s) encontrado(s)."}</caption>
                </table>
            )}
        </div>
    );
}

export default Table;