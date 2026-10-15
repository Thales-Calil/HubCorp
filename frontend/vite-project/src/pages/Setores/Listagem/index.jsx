import { useEffect, useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { ApiError } from '../../../services/api';
import { excluirSetor, listarSetores } from '../../../services/setorService';
import './style.css';

function erroDaApi(error, operacao) {
  if (error instanceof ApiError && error.status === 403) return 'Você não possui permissão para esta operação.';
  if (error instanceof ApiError && error.status === 404) return 'O setor não foi encontrado.';
  if (error instanceof ApiError && error.status === 0) return 'Não foi possível conectar à API.';
  return `Não foi possível ${operacao}.`;
}

function SetoresListagem({ mensagem, onEditarSetor, onNavigate, onNovoSetor, onLogout, onSessionExpired, token, usuario }) {
  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [setores, setSetores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagemOperacao, setMensagemOperacao] = useState('');
  const [excluindoId, setExcluindoId] = useState(null);
  const [recarregar, setRecarregar] = useState(0);

  useEffect(() => {
    let ativo = true;
    async function carregarSetores() {
      setCarregando(true); setErro('');
      try {
        const dados = await listarSetores(token);
        if (ativo) setSetores(Array.isArray(dados) ? dados : []);
      } catch (error) {
        if (!ativo) return;
        if (error instanceof ApiError && error.status === 401) { onSessionExpired(); return; }
        setErro(erroDaApi(error, 'carregar os setores'));
      } finally { if (ativo) setCarregando(false); }
    }
    carregarSetores();
    return () => { ativo = false; };
  }, [onSessionExpired, recarregar, token]);

  const termo = busca.trim().toLowerCase();
  const filtrados = setores.filter(setor => String(setor.nome || '').toLowerCase().includes(termo) || String(setor.descricao || '').toLowerCase().includes(termo));

  async function removerSetor(setor) {
    if (!window.confirm(`Deseja excluir permanentemente o setor ${setor.nome}?`)) return;
    setExcluindoId(setor.id); setErro(''); setMensagemOperacao('');
    try {
      await excluirSetor(setor.id, token);
      setMensagemOperacao('Setor excluído com sucesso.');
      setRecarregar(valor => valor + 1);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) { onSessionExpired(); return; }
      setErro('A exclusão não foi concluída. O setor pode possuir relacionamento com outros registros.');
    } finally { setExcluindoId(null); }
  }

  return <div className="setores-page">
    <Sidebar activeItem="Setores" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
    {menuAberto && <button className="setores-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
    <div className="setores-workspace"><Header title="Gerenciamento de Setores" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
      <main className="setores-content"><section className="setores-title-row"><div><h2>Gerenciamento de Setores</h2><p>Cadastre e gerencie os setores da organização.</p></div><button className="new-sector-button" type="button" onClick={onNovoSetor}><Plus size={17} /><span>Novo Setor</span></button></section>
        <section className="setores-filters"><label className="sector-search"><Search size={17} /><input value={busca} onChange={event => setBusca(event.target.value)} placeholder="Buscar por nome ou descrição..." /></label></section>
        {(mensagem || mensagemOperacao) && <p className="setores-success-message" role="status">{mensagem || mensagemOperacao}</p>}{erro && <p className="setores-error-message" role="alert">{erro}</p>}
        {carregando && <p className="setores-empty-message">Carregando setores...</p>}
        {!carregando && !erro && setores.length === 0 && <p className="setores-empty-message">Nenhum setor cadastrado.</p>}
        {!carregando && !erro && setores.length > 0 && <section className="setores-table-wrapper"><table className="setores-table"><thead><tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Ações</th></tr></thead><tbody>{filtrados.map(setor => <tr key={setor.id}><td>{setor.id}</td><td><strong>{setor.nome}</strong></td><td>{setor.descricao || '—'}</td><td><div className="setor-action-buttons"><button className="setor-action-button" type="button" aria-label={`Editar ${setor.nome}`} disabled={excluindoId === setor.id} onClick={() => onEditarSetor(setor.id)}><Pencil size={15} /></button><button className="setor-action-button setor-delete-button" type="button" aria-label={`Excluir ${setor.nome}`} disabled={excluindoId === setor.id} onClick={() => removerSetor(setor)}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></section>}
        {!carregando && !erro && setores.length > 0 && filtrados.length === 0 && <p className="setores-empty-message">Nenhum setor encontrado.</p>}
      </main>
    </div>
  </div>;
}
export default SetoresListagem;
