import './style.css';
function PerfilGeral({
  nome,
  setNome,
  email,
  setEmail,
  telefone,
  setTelefone,
  cargo,
  setCargo
}) {
  return <section className="profile-data-card"><h3>Informações pessoais</h3><div className="profile-form-grid"><label>Nome completo<input value={nome} onChange={event => setNome(event.target.value)} /></label><label>E-mail corporativo<input value={email} onChange={event => setEmail(event.target.value)} /></label><label>Telefone<input value={telefone} onChange={event => setTelefone(event.target.value)} /></label><label>Cargo<input value={cargo} onChange={event => setCargo(event.target.value)} /></label></div><div className="profile-save-area"><button type="button" onClick={() => alert('Alterações salvas com sucesso')}>Salvar alterações</button></div></section>;
}
export default PerfilGeral;
