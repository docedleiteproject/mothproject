const fs = require('fs');
const path = require('path');

// Função para verificar e aplicar o selo de segurança
function verifyAndSecureDomain(domainFolder) {
    const infoPath = path.join(__dirname, '../../domains', domainFolder, 'info.json');

    if (!fs.existsSync(infoPath)) {
        return { success: false, message: 'Domínio não encontrado!' };
    }

    try {
        const rawData = fs.readFileSync(infoPath, 'utf8');
        let domainData = JSON.parse(rawData);

        // Regra: Apenas o bot/sistema pode alterar o isSecureDomain após aceitar os termos
        domainData.isSecureDomain = true;

        fs.writeFileSync(infoPath, JSON.stringify(domainData, null, 2), 'utf8');
        
        return { 
            success: true, 
            message: `Domínio ${domainData.domainName} verificado com sucesso! Selo aplicado. 🛡️` 
        };
    } catch (error) {
        return { success: false, message: `Erro ao processar segurança: ${error.message}` };
    }
}

module.exports = { verifyAndSecureDomain };
