const fs = require('fs');
const path = require('path');

function limitOtherDomain(req, res, next) {
    // Pega o domínio requisitado (ex: via headers ou subdomínio)
    const requestedDomain = req.headers['x-moth-domain'] || req.hostname;
    const domainDirPath = path.join(__dirname, '../domains', requestedDomain);

    // Verifica se a pasta do domínio existe fisicamente
    if (!fs.existsSync(domainDirPath)) {
        return res.status(403).json({
            error: true,
            message: "Acesso negado. Domínio não registrado ou fantasma detectado! 🚫🦋"
        });
    }

    // Se existe, segue o baile para a próxima etapa
    next();
}

module.exports = { limitOtherDomain };
