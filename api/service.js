const express = require('express');
const { limitOtherDomain } = require('./limitotherdomain');
const { compilePage } = require('./comp');
const { verifyAndSecureDomain } = require('./methods/securelog');

const app = express();
app.use(express.json());

// Rota de teste/ativação de segurança (simulando a ação do bot)
app.post('/moth/secure/:domain', (req, res) => {
    const result = verifyAndSecureDomain(req.params.domain);
    res.json(result);
});

// Aplicando o limitotherdomain em todas as requisições de domínios personalizados
app.use(limitOtherDomain);

// Rota principal que traduz e renderiza as páginas do domínio
app.get('/:page?', (req, res) => {
    const domainName = req.headers['x-moth-domain'] || req.hostname;
    const pageName = req.params.page || 'index';

    const compiled = compilePage(domainName, pageName);
    res.status(compiled.status).send(compiled.html);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🦋 Moth Project rodando lindamente na porta ${PORT}! 🚀✨`);
});
