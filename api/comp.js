const fs = require('fs');
const path = require('path');

function compilePage(domainName, pageName) {
    const domainPath = path.join(__dirname, '../domains', domainName);
    const infoPath = path.join(domainPath, 'info.json');

    if (!fs.existsSync(infoPath)) {
        return { html: "<h1>Domínio não encontrado</h1>", status: 404 };
    }

    const domainData = JSON.parse(fs.readFileSync(infoPath, 'utf8'));

    // Verifica se a página está listada nas actions/pages permitidas
    if (!domainData.pages.includes(pageName)) {
        return { html: "<h1>404 - Página não encontrada no registro</h1>", status: 404 };
    }

    // Procura o arquivo da página (pode ser .html ou .json traduzido)
    const pageFilePath = path.join(domainPath, `${pageName}.html`);
    const pageJsonPath = path.join(domainPath, `${pageName}.json`);

    if (fs.existsSync(pageFilePath)) {
        const htmlContent = fs.readFileSync(pageFilePath, 'utf8');
        return { html: htmlContent, status: 200 };
    } else if (fs.existsSync(pageJsonPath)) {
        // Se for JSON, traduz para uma visualização em HTML estruturada
        const jsonData = JSON.parse(fs.readFileSync(pageJsonPath, 'utf8'));
        return { 
            html: `<div style="font-family:sans-serif; padding:20px;"><h1>Dados Traduzidos</h1><pre>${JSON.stringify(jsonData, null, 2)}</pre></div>`, 
            status: 200 
        };
    }

    return { html: "<h1>Página vazia ou arquivo ausente</h1>", status: 404 };
}

module.exports = { compilePage };
