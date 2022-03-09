import { useContext } from 'react';
import TimeContext from './TimeContext';
import Alert from '../Alert';

function Table() {
    const { setObject, alert, setAlert, objectList, remove, setEdit, getById} = useContext(TimeContext);

    return (
        <div className="p-4">
            <div className="d-flex">
                <h3>Lista de Times</h3>
                <div className="flex-grow-1"></div>
                <div className="d-inline">
                    <button type="button" className="btn btn-primary"
                            data-bs-toggle="modal" data-bs-target="#modalEdicao"
                            onClick={() => {
                                setObject({
                                    codigo: "",
                                    nome: "",
                                    sigla: "",
                                    ano_fundacao: "",
                                    historia: ""
                                });
                                setEdit(false);
                                setAlert({ status: "", message: "" });
                            }}>
                        Novo <i className="bi bi-file-earmark-plus"></i>
                    </button>
                </div>
            </div>
            <Alert alert={alert} />
            {objectList.length === 0 && <h4>Nenhum time foi encontrado! ☹️</h4>}
            {objectList.length > 0 && (
                <table className="table table-striped align-middle mt-2">
                    <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sigla</th>
                        <th scope="col">Ano de Fundação</th>
                        <th scope="col" className="text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {objectList.map(object => (
                        <tr key={object.codigo}>
                            <td>{object.codigo}</td>
                            <td>{object.nome}</td>
                            <td>{object.sigla}</td>
                            <td>{object.ano_fundacao}</td>
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