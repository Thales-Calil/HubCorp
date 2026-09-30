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
  return <section className="preferences-card"><h3>Preferências de notificação</h3><div>{opcoes.map(opcao => <label key={opcao.id}><input type="checkbox" checked={preferencias[opcao.id]} onChange={() => setPreferencias({
          ...preferencias,
          [opcao.id]: !preferencias[opcao.id]
        })} /><span>{opcao.texto}</span></label>)}</div><footer><button type="button" onClick={() => alert('Preferências salvas com sucesso')}>Salvar preferências</button></footer></section>;
}
export default PerfilPreferencias;
