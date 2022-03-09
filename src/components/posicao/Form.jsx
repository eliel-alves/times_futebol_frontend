import { useContext } from 'react';
import PosicaoContext from './PosicaoContext';

function Form() {
    const { object, handleChange, add } = useContext(PosicaoContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Posição</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    <form id="formTime" onSubmit={add}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="txtCodigo" className="form-label fw-bold">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodigo"
                                    name="codigo"
                                    value={object.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="txtNome" className="form-label fw-bold">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    placeholder="Digite o nome da Posição"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={object.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;