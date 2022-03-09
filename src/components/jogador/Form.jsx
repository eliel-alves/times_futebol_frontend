import { useContext } from 'react';
import JogadorContext from './JogadorContext';

function Form() {
    const { object, handleChange, add, timesList, posicoesList } = useContext(JogadorContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Jogador</h5>
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
                                    placeholder="Digite o nome do Jogador"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={object.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="numberCamisa" className="form-label fw-bold">
                                    Número da Camisa
                                </label>
                                <input
                                    type="number" min="1" max="99"
                                    placeholder="Insira o número da camisa"
                                    className="form-control"
                                    id="numberCamisa"
                                    name="numero_camisa"
                                    value={object.numero_camisa}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="selectTime" className="form-label fw-bold">
                                    Time
                                </label>
                                <select
                                    className="form-control"
                                    id="selectTime"
                                    value={object.time}
                                    name="time"
                                    onChange={handleChange}
                                    required>
                                    <option disable="true" value="">(Selecione o Time)</option>
                                    {timesList.map((time) => (
                                        <option key={time.codigo} value={time.codigo}>
                                            {time.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="selectPosicao" className="form-label fw-bold">
                                    Posição
                                </label>
                                <select
                                    className="form-control"
                                    id="selectPosicao"
                                    value={object.posicao}
                                    name="posicao"
                                    onChange={handleChange}
                                    required>
                                    <option disable="true" value="">(Selecione a Posição)</option>
                                    {posicoesList.map((posicao) => (
                                        <option key={posicao.codigo} value={posicao.codigo}>
                                            {posicao.nome}
                                        </option>
                                    ))}
                                </select>
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