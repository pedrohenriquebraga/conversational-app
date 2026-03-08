const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/**
 * Exemplos de respostas estruturadas que a IA pode retornar
 */
const responseExamples = [
  {
    type: 'message',
    content: [
      {
        type: 'TextH1',
        id: 'h1-1',
        props: {
          children: 'Como iniciar no desenvolvimento mobile?',
          style: {
            color: '#007AFF',
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 20,
          },
        },
      },
      {
        type: 'TextParagraph',
        id: 'p-1',
        props: {
          children:
            'O desenvolvimento mobile é uma área em crescimento constante. Existem várias plataformas e linguagens que você pode aprender para iniciar sua carreira.',
          style: {
            fontSize: 15,
            lineHeight: 24,
            color: '#333333',
          },
        },
      },
    ],
  },
  {
    type: 'message',
    content: [
      {
        type: 'TextH1',
        id: 'h1-2',
        props: {
          children: 'React Native vs Flutter',
          style: {
            color: '#1D1D1D',
            fontSize: 26,
          },
        },
      },
      {
        type: 'TextH1',
        id: 'h1-3',
        props: {
          children: 'React Native',
          style: {
            color: '#61DAFB',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 16,
          },
        },
      },
      {
        type: 'TextList',
        id: 'list-1',
        props: {
          items: [
            {
              text: 'JavaScript/TypeScript',
              style: {
                color: '#61DAFB',
                fontWeight: '600',
              },
            },
            {
              text: 'Comunidade maior',
              style: {
                color: '#61DAFB',
                fontWeight: '600',
              },
            },
            {
              text: 'Mais bibliotecas disponíveis',
              style: {
                color: '#61DAFB',
                fontWeight: '600',
              },
            },
          ],
        },
      },
      {
        type: 'TextH1',
        id: 'h1-4',
        props: {
          children: 'Flutter',
          style: {
            color: '#02569B',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 16,
          },
        },
      },
      {
        type: 'TextList',
        id: 'list-2',
        props: {
          items: [
            {
              text: 'Dart',
              style: {
                color: '#02569B',
                fontWeight: '600',
              },
            },
            {
              text: 'Performance superior',
              style: {
                color: '#02569B',
                fontWeight: '600',
              },
            },
            {
              text: 'Crescimento rápido',
              style: {
                color: '#02569B',
                fontWeight: '600',
              },
            },
          ],
        },
      },
    ],
  },
  {
    type: 'message',
    content: [
      {
        type: 'TextH1',
        id: 'h1-5',
        props: {
          children: 'Arquitetura Flux com Redux',
          style: {
            color: '#007AFF',
            fontSize: 26,
            fontWeight: 'bold',
          },
        },
      },
      {
        type: 'TextParagraph',
        id: 'p-2',
        props: {
          children:
            'Flux é um padrão de arquitetura para gerenciar estado de forma previsível em aplicações.',
          style: {
            color: '#333333',
            fontSize: 15,
          },
        },
      },
      {
        type: 'TextH1',
        id: 'h1-6',
        props: {
          children: 'Componentes Principais',
          style: {
            color: '#34C759',
            fontSize: 18,
            fontWeight: '600',
            marginTop: 20,
          },
        },
      },
      {
        type: 'TextList',
        id: 'list-3',
        props: {
          items: [
            {
              text: 'Actions - Descrição do que aconteceu',
              style: {
                color: '#34C759',
                fontWeight: '500',
              },
            },
            {
              text: 'Reducers - Transformam o estado',
              style: {
                color: '#34C759',
                fontWeight: '500',
              },
            },
            {
              text: 'Store - Centraliza o estado',
              style: {
                color: '#34C759',
                fontWeight: '500',
              },
            },
            {
              text: 'Sagas - Gerenciam side effects',
              style: {
                color: '#34C759',
                fontWeight: '500',
              },
            },
            {
              text: 'Views - Componentes React',
              style: {
                color: '#34C759',
                fontWeight: '500',
              },
            },
          ],
        },
      },
    ],
  },
];

/**
 * Simula delay de processamento
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Envia streaming de resposta em chunks
 * Útil para testar se o cliente consegue renderizar respostas parciais
 */
const streamResponse = (res, responseData, delayMs = 100) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  // Envia um chunk com toda a resposta (você pode dividir em múltiplos chunks se quiser)
  res.write(JSON.stringify(responseData));
  res.end();
};

/**
 * Endpoint: POST /api/chat
 * Recebe um prompt e retorna uma resposta estruturada em JSON
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'Prompt é obrigatório e deve ser uma string',
      });
    }

    console.log(`[CHAT] Prompt recebido: "${prompt}"`);

    // Seleciona uma resposta aleatória
    const responseIndex = Math.floor(Math.random() * responseExamples.length);
    const selectedResponse = responseExamples[responseIndex];

    // Simula delay do servidor processando
    await delay(500);

    console.log(`[CHAT] Enviando resposta ${responseIndex + 1}...`);

    // Envia streaming
    streamResponse(res, selectedResponse);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({
      error: 'Erro ao processar requisição',
      message: error.message,
    });
  }
});

/**
 * Endpoint: GET /api/health
 * Para verificar se o servidor está rodando
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Endpoint: GET /
 * Página inicial com informações
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Chat IA - Servidor de Teste</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
          color: #007AFF;
          margin-bottom: 10px;
        }
        .status {
          background: #34C759;
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 20px;
        }
        .endpoint {
          background: #f9f9f9;
          padding: 16px;
          border-left: 4px solid #007AFF;
          margin: 20px 0;
          border-radius: 4px;
        }
        .endpoint h3 {
          margin: 0 0 10px 0;
          color: #007AFF;
        }
        .code {
          background: #2d2d2d;
          color: #f8f8f2;
          padding: 12px;
          border-radius: 4px;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          margin: 10px 0;
        }
        .example {
          margin-top: 10px;
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Chat IA - Servidor de Teste</h1>
        <div class="status">✓ Servidor Rodando</div>

        <h2>Endpoints Disponíveis</h2>

        <div class="endpoint">
          <h3>POST /api/chat</h3>
          <p>Envia um prompt e recebe uma resposta estruturada em JSON via streaming.</p>
          <div class="code">
curl -X POST http://localhost:3000/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"Como iniciar no desenvolvimento mobile?"}'
          </div>
          <div class="example">
            <strong>Request Body:</strong>
            <div class="code">{ "prompt": "Sua pergunta aqui" }</div>
            <strong>Response (Streaming):</strong>
            <div class="code">
{
  "type": "message",
  "content": [
    {
      "type": "TextH1",
      "id": "h1-1",
      "props": {
        "children": "Título",
        "style": { ... }
      }
    },
    ...
  ]
}
            </div>
          </div>
        </div>

        <div class="endpoint">
          <h3>GET /api/health</h3>
          <p>Verifica o status do servidor.</p>
          <div class="code">
curl http://localhost:3000/api/health
          </div>
        </div>

        <h2>Como Testar</h2>
        <ol>
          <li>Inicie o servidor: <code>node server.js</code></li>
          <li>O servidor rodará em <code>http://localhost:3000</code></li>
          <li>Use Postman, curl ou seu app React Native para fazer requisições</li>
          <li>O servidor retornará uma resposta estruturada aleatoriamente</li>
        </ol>

        <h2>Configuração no App</h2>
        <p>No seu arquivo de configuração da API, aponte para:</p>
        <div class="code">const API_URL = 'http://localhost:3000';</div>

        <h2>Componentes Suportados</h2>
        <ul>
          <li><strong>TextH1</strong> - Título grande</li>
          <li><strong>TextParagraph</strong> - Parágrafo</li>
          <li><strong>TextList</strong> - Lista com bullets</li>
        </ul>

        <h2>Status</h2>
        <p>
          Porta: <strong>3000</strong><br/>
          Timestamp: <strong>${new Date().toISOString()}</strong>
        </p>
      </div>
    </body>
    </html>
  `);
});

/**
 * Middleware de erro
 */
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message,
  });
});

/**
 * Inicia o servidor
 */
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════��════╗
║          🚀 Chat IA - Servidor de Teste                   ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📍 Servidor rodando em: http://localhost:${PORT}          ║
║                                                            ║
║  📡 Endpoints:                                             ║
║     • POST   /api/chat      - Enviar prompt              ║
║     • GET    /api/health    - Status do servidor         ║
║     • GET    /              - Interface web               ║
║                                                            ║
║  💡 Para testar, acesse: http://localhost:${PORT}          ║
║                                                            ║
║  🛑 Para parar: Ctrl + C                                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
