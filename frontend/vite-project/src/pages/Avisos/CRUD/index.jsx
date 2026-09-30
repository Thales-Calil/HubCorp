import { useState } from 'react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import './style.css';
function AvisosCRUD({
  onCancelar,
  onNavigate
}) {
  const [tipo, setTipo] = useState('Geral');
  const [setor, setSetor] = useState('Todos os setores');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [dataExpiracao, setDataExpiracao] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  function publicarAviso() {
    if (!titulo || !conteudo) {
      alert('Preencha o título e o conteúdo do aviso.');
      return;
    }
    alert('Aviso preenchido com sucesso.');
  }
  return <div className="aviso-crud-page">
      <Sidebar activeItem="Avisos e Comunicados" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />
      {menuAberto && <button className="aviso-crud-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}

      <div className="aviso-crud-workspace">
        <Header title="Novo Aviso" onMenuClick={() => setMenuAberto(!menuAberto)} />
        <main className="aviso-crud-content">
          <section className="aviso-crud-heading">
            <h2>Novo Aviso</h2>
            <p>Preencha os campos abaixo para publicar um novo comunicado</p>
          </section>

          <div className="aviso-crud-layout">
            <section className="aviso-form-card">
              <div className="aviso-form-grid">
                <label>Tipo de aviso <em>*</em>
                  <select value={tipo} onChange={event => setTipo(event.target.value)}><option>Geral</option><option>Urgente</option><option>Evento</option><option>RH</option></select>
                </label>
                <label>Setor destinatário
                  <select value={setor} onChange={event => setSetor(event.target.value)}><option>Todos os setores</option><option>Tecnologia da Informação</option><option>Recursos Humanos</option><option>Comercial</option><option>Marketing</option><option>Operações</option><option>Facilities</option></select>
                </label>
              </div>
              <label className="aviso-full-field">Título do aviso <em>*</em>
                <input value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Ex: Reunião de alinhamento � Departamento Comercial" />
              </label>
              <label className="aviso-full-field">Conteúdo <em>*</em>
                <textarea value={conteudo} onChange={event => setConteudo(event.target.value)} placeholder="Escreva o conteúdo completo do comunicado aqui..." />
              </label>
              <label className="aviso-full-field aviso-date-field">Data de expiração
                <input type="date" value={dataExpiracao} onChange={event => setDataExpiracao(event.target.value)} />
              </label>
              <div className="aviso-form-actions"><button type="button" className="aviso-cancel-button" onClick={onCancelar}>Cancelar</button><button type="button" className="aviso-publish-button" onClick={publicarAviso}>Publicar aviso</button></div>
            </section>

            <aside className="aviso-preview-column">
              <p className="aviso-preview-title">Pré-visualização</p>
              <section className={`aviso-preview-card preview-${tipo.toLowerCase()}`}>
                <div><h3>{titulo || 'Título do aviso'}</h3><span>{tipo}</span></div>
                <p>{conteudo || 'O conteúdo do aviso aparecerá aqui...'}</p>
              </section>
              <section className="publisher-card"><h3>Informações do publicador</h3><strong>Ricardo Almeida</strong><p>Administrador do Sistema ⬢ Tecnologia da Informação</p></section>
            </aside>
          </div>
        </main>
      </div>
    </div>;
}
export default AvisosCRUD;
