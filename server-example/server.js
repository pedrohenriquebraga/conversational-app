const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fluxChunks = [
  { type: 'TextH1', id: 'c1', props: { children: 'O que é a Arquitetura Flux?', style: { color: '#007AFF', fontSize: 28, fontWeight: 'bold', marginBottom: 20 } } },
  { type: 'TextParagraph', id: 'c2', props: { children: 'Flux é um padrão arquitetural criado pelo Facebook para gerenciar o fluxo de dados em aplicações front-end de forma previsível e unidirecional.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextParagraph', id: 'c3', props: { children: 'Diferente do MVC tradicional, o Flux garante que os dados sempre fluam em uma única direção, tornando o comportamento da aplicação mais fácil de entender e depurar.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextH1', id: 'c4', props: { children: 'Os 4 Pilares do Flux', style: { color: '#FF6B35', fontSize: 22, fontWeight: 'bold', marginTop: 20 } } },
  { type: 'TextH1', id: 'c5', props: { children: '1. Actions', style: { color: '#FF6B35', fontSize: 18, fontWeight: '600', marginTop: 12 } } },
  { type: 'TextParagraph', id: 'c6', props: { children: 'Actions são objetos simples que descrevem o que aconteceu na aplicação. Elas possuem um tipo (type) e opcionalmente um payload com dados.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextH1', id: 'c7', props: { children: '2. Dispatcher', style: { color: '#9B59B6', fontSize: 18, fontWeight: '600', marginTop: 12 } } },
  { type: 'TextParagraph', id: 'c8', props: { children: 'O Dispatcher é o hub central do Flux. Ele recebe as Actions e as distribui para todas as Stores registradas, garantindo a ordem de execução.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextH1', id: 'c9', props: { children: '3. Stores', style: { color: '#27AE60', fontSize: 18, fontWeight: '600', marginTop: 12 } } },
  { type: 'TextParagraph', id: 'c10', props: { children: 'As Stores contêm o estado da aplicação e a lógica de negócio. Elas se registram no Dispatcher e reagem às Actions recebidas, atualizando o estado interno.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextH1', id: 'c11', props: { children: '4. Views', style: { color: '#2980B9', fontSize: 18, fontWeight: '600', marginTop: 12 } } },
  { type: 'TextParagraph', id: 'c12', props: { children: 'As Views são os componentes React que exibem os dados das Stores. Quando uma Store atualiza, as Views são notificadas e se re-renderizam.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextH1', id: 'c13', props: { children: 'Fluxo Unidirecional', style: { color: '#007AFF', fontSize: 22, fontWeight: 'bold', marginTop: 24 } } },
  { type: 'TextParagraph', id: 'c14', props: { children: 'O ciclo completo é: Action → Dispatcher → Store → View → (nova Action). Esse fluxo nunca se inverte, eliminando dependências circulares.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextH1', id: 'c15', props: { children: 'Flux vs MVC', style: { color: '#FF6B35', fontSize: 22, fontWeight: 'bold', marginTop: 24 } } },
  { type: 'TextList', id: 'c16', props: { items: [{ text: 'MVC permite fluxo bidirecional, Flux é sempre unidirecional', style: { color: '#333333' } }, { text: 'MVC tem Controllers, Flux usa o Dispatcher centralizado', style: { color: '#333333' } }, { text: 'Flux é mais previsível em aplicações de grande escala', style: { color: '#333333' } }] } },
  { type: 'TextH1', id: 'c17', props: { children: 'Redux: Flux Simplificado', style: { color: '#764ABC', fontSize: 22, fontWeight: 'bold', marginTop: 24 } } },
  { type: 'TextParagraph', id: 'c18', props: { children: 'Redux é a implementação mais popular dos princípios do Flux. Ele unifica todas as Stores em uma única Store global e substitui o Dispatcher por Reducers — funções puras que calculam o novo estado.', style: { fontSize: 15, lineHeight: 24, color: '#333333' } } },
  { type: 'TextList', id: 'c19', props: { items: [{ text: 'Single source of truth — uma Store global', style: { color: '#764ABC', fontWeight: '600' } }, { text: 'Estado é read-only — só muda via Actions', style: { color: '#764ABC', fontWeight: '600' } }, { text: 'Mudanças feitas por funções puras (Reducers)', style: { color: '#764ABC', fontWeight: '600' } }] } },
  { type: 'TextParagraph', id: 'c20', props: { children: 'Hoje o Flux é a base de soluções como Redux, Zustand e Redux Toolkit, sendo amplamente adotado em aplicações React e React Native.', style: { fontSize: 15, lineHeight: 24, color: '#555555', marginTop: 16 } } },
];

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt é obrigatório' });
  }

  const messageId = uuidv4();
  const accumulatedContent = [];

  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  for (let i = 0; i < fluxChunks.length; i++) {
    accumulatedContent.push(fluxChunks[i]);
    await delay(1000);

    const chunk = {
      type: 'message',
      messageId,
      status: i === fluxChunks.length - 1 ? 'complete' : 'streaming',
      content: accumulatedContent,
      currentComponentIndex: i + 1,
      totalComponents: fluxChunks.length,
    };

    const canContinue = res.write(JSON.stringify(chunk) + '\n');
    if (!canContinue) await new Promise(resolve => res.once('drain', resolve));
  }

  res.end();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
