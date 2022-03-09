import { useContext } from 'react';
import TimeContext from './TimeContext';

function Form() {
    const { object, handleChange, add } = useContext(TimeContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Time</h5>
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
                                    placeholder="Digite o nome do Time"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={object.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="txtSigla" className="form-label fw-bold">
                                    Sigla
                                </label>
                                <input
                                    type="text" maxLength="3"
                                    placeholder="Sigla"
                                    className="form-control"
                                    style={{textTransform: "uppercase"}}
                                    id="txtSigla"
                                    name="sigla"
                                    value={object.sigla}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="numberAnoFundacao" className="form-label fw-bold">
                                    Ano de Fundação
                                </label>
                                <input
                                    type="number" min="1500" max="2022"
                                    className="form-control"
                                    id="numberAnoFundacao"
                                    name="ano_fundacao"
                                    value={object.ano_fundacao}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="txtHistoria" className="form-label fw-bold">
                                    História
                                </label>
                                <textarea
                                    className="form-control"
                                    placeholder="Digite a história do Time"
                                    id="txtHistoria"
                                    name="historia"
                                    value={object.historia}
                                    onChange={handleChange}
                                    rows="3"
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