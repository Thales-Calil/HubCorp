import './style.css';

function PerfilGeral({
  nome,
  email,
  telefone,
  cargo
}) {
  return <section className="profile-data-card">
      <h3>Informações pessoais</h3>
      <p className="profile-readonly-note">Dados recebidos da sessão autenticada. A API ainda não oferece atualização segura do próprio perfil.</p>
      <div className="profile-form-grid">
        <label>Nome completo<input disabled value={nome} /></label>
        <label>E-mail corporativo<input disabled value={email} /></label>
        <label>Telefone<input disabled value={telefone} /></label>
        <label>Cargo<input disabled value={cargo} /></label>
      </div>
      <div className="profile-save-area"><p>A edição permanece indisponível para evitar usar o cadastro administrativo como perfil pessoal.</p><button disabled type="button">Edição indisponível</button></div>
    </section>;
}

export default PerfilGeral;
