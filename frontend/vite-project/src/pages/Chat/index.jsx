import { useState } from 'react';
import { ArrowLeft, Mail, Phone, Plus, Send } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
const conversasIniciais = [{
  nome: 'Fernanda Costa',
  iniciais: 'FC',
  cargo: 'Analista de RH Sênior',
  setor: 'Recursos Humanos',
  email: 'fernanda.costa@hubcorp.com.br',
  telefone: '(11) 97744-5566',
  resumo: '�timo, Fernanda! Vou buscar ain...',
  mensagens: ['Camila, tudo bem? Sua declaração de vínculo está pronta para retirada.', '�timo, Fernanda! Vou buscar ainda hoje. Muito obrigada!']
}, {
  nome: 'Marcelo Vieira',
  iniciais: 'MV',
  cargo: 'Gerente Comercial',
  setor: 'Comercial',
  email: 'marcelo.vieira@hubcorp.com.br',
  telefone: '(11) 97744-5577',
  naoLidas: 1,
  mensagens: ['Bom dia! A atualização do relatório comercial foi concluída.', 'Perfeito, obrigado pelo retorno.']
}, {
  nome: 'João Ferreira',
  iniciais: 'JF',
  cargo: 'Técnico de Manutenção',
  setor: 'Facilities',
  email: 'joao.ferreira@hubcorp.com.br',
  telefone: '(11) 97744-5588',
  mensagens: ['A manutenção preventiva foi finalizada.', 'Obrigado, João.']
}];
function avatarClasse(iniciais) {
  return iniciais === 'MV' ? 'chat-avatar-mv' : iniciais === 'JF' ? 'chat-avatar-jf' : 'chat-avatar-fc';
}
function Chat({
  onNavigate
}) {
  const [conversas, setConversas] = useState(conversasIniciais);
  const [contatoSelecionado, setContatoSelecionado] = useState('Fernanda Costa');
  const [novaMensagem, setNovaMensagem] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [mobileChatAberto, setMobileChatAberto] = useState(false);
  const conversaAtual = conversas.find(conversa => conversa.nome === contatoSelecionado);
  function selecionarContato(nome) {
    setContatoSelecionado(nome);
    setMobileChatAberto(true);
  }
  function enviarMensagem() {
    if (!novaMensagem.trim()) return;
    setConversas(conversas.map(conversa => conversa.nome === contatoSelecionado ? {
      ...conversa,
      mensagens: [...conversa.mensagens, novaMensagem.trim()]
    } : conversa));
    setNovaMensagem('');
  }
  return <div className="chat-page"><Sidebar activeItem="Chat" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />{menuAberto && <button className="chat-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}<div className="chat-workspace"><Header title="Chat Corporativo" onMenuClick={() => setMenuAberto(!menuAberto)} /><main className="chat-content"><section className={`chat-shell ${mobileChatAberto ? 'chat-mobile-open' : ''}`}><aside className="chat-conversations"><header><h2>Conversas</h2><button type="button" aria-label="Nova conversa"><Plus size={18} strokeWidth={1.7} /></button></header>{conversas.map(conversa => <button type="button" className={`chat-contact ${conversa.nome === contatoSelecionado ? 'chat-contact-active' : ''}`} key={conversa.nome} onClick={() => selecionarContato(conversa.nome)}><span className={`chat-avatar ${avatarClasse(conversa.iniciais)}`}>{conversa.iniciais}</span><span className="chat-contact-text"><strong>{conversa.nome}</strong>{conversa.resumo && <small>{conversa.resumo}</small>}</span>{conversa.naoLidas && <i>{conversa.naoLidas}</i>}</button>)}</aside><section className="chat-thread"><header className="chat-thread-header"><div><button type="button" className="chat-back-button" onClick={() => setMobileChatAberto(false)} aria-label="Voltar"><ArrowLeft size={19} strokeWidth={1.7} /></button><span className={`chat-avatar ${avatarClasse(conversaAtual.iniciais)}`}>{conversaAtual.iniciais}</span><h2>{conversaAtual.nome}</h2></div><nav><button type="button" aria-label="Ligar"><Phone size={17} strokeWidth={1.6} /></button><button type="button" aria-label="Enviar e-mail"><Mail size={17} strokeWidth={1.6} /></button></nav></header><div className="chat-messages">{conversaAtual.mensagens.map((mensagem, indice) => <article key={`${mensagem}-${indice}`}><span className={`chat-avatar ${avatarClasse(conversaAtual.iniciais)}`}>{conversaAtual.iniciais}</span><p>{mensagem}</p></article>)}</div><div className="chat-composer"><input value={novaMensagem} onChange={event => setNovaMensagem(event.target.value)} placeholder="Digite sua mensagem..." onKeyDown={event => event.key === 'Enter' && enviarMensagem()} /><button type="button" onClick={enviarMensagem} aria-label="Enviar mensagem"><Send size={18} strokeWidth={1.7} /></button></div></section><aside className="chat-profile"><span className={`chat-profile-avatar ${avatarClasse(conversaAtual.iniciais)}`}>{conversaAtual.iniciais}</span><h2>{conversaAtual.nome}</h2><p>{conversaAtual.cargo}</p><div><article><small>Setor</small><strong>{conversaAtual.setor}</strong></article><article><small>E-mail</small><strong>{conversaAtual.email}</strong></article><article><small>Telefone</small><strong>{conversaAtual.telefone}</strong></article></div></aside></section></main></div></div>;
}
export default Chat;
