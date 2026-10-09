import './style.css';

const opcoes = [{
  id: 'avisos',
  texto: 'Avisos e comunicados'
}, {
  id: 'atividades',
  texto: 'Novas atividades atribuídas'
}, {
  id: 'solicitacoes',
  texto: 'Atualizações de solicitações'
}, {
  id: 'mensagens',
  texto: 'Novas mensagens no chat'
}, {
  id: 'calendario',
  texto: 'Novos eventos no calendário'
}, {
  id: 'sistema',
  texto: 'Avisos de sistema'
}];

function PerfilPreferencias({
  preferencias,
  setPreferencias
}) {
  return <section className="preferences-card">
      <h3>Preferências de notificação</h3>
      <p className="profile-demo-note">As escolhas desta aba são demonstrativas e permanecem somente enquanto a tela estiver aberta.</p>
      <div>{opcoes.map(opcao => <label key={opcao.id}><input type="checkbox" checked={preferencias[opcao.id]} onChange={() => setPreferencias({
          ...preferencias,
          [opcao.id]: !preferencias[opcao.id]
        })} /><span>{opcao.texto}</span></label>)}</div>
      <footer><p>A API ainda não possui contrato para persistir estas preferências.</p><button disabled type="button">Persistência indisponível</button></footer>
    </section>;
}

export default PerfilPreferencias;
