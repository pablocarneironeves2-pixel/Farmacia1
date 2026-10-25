// DADOS PERSISTIDOS VIA LOCALSTORAGE  
let produtos = JSON.parse(localStorage.getItem('pharmacontrol_produtos')) || [  
{ id: 1, ean: "789101112001", nome: "Dipirona Sódica 500mg", categoria: "Analgésico", tarja: "Livre", lote: "L1023", validade: "2027-10-15", preco: 12.50, estoque: 45, imagem: "https://cdn-icons-png.flaticon.com/512/884/884488.png" },  
{ id: 2, ean: "789101112002", nome: "Paracetamol 750mg", categoria: "Analgésico", tarja: "Livre", lote: "L1024", validade: "2026-05-10", preco: 15.00, estoque: 8, imagem: "https://cdn-icons-png.flaticon.com/512/884/884488.png" },  
{ id: 3, ean: "789101112003", nome: "Amoxicilina 500mg", categoria: "Antibiótico", tarja: "Vermelha", lote: "L2025", validade: "2026-11-20", preco: 38.90, estoque: 15, imagem: "https://cdn-icons-png.flaticon.com/512/884/884488.png" },  
{ id: 4, ean: "789101112004", nome: "Ibuprofeno 600mg", categoria: "Anti-inflamatório", tarja: "Livre", lote: "L3041", validade: "2028-01-10", preco: 22.00, estoque: 30, imagem: "https://cdn-icons-png.flaticon.com/512/884/884488.png" },  
{ id: 5, ean: "789101112005", nome: "Cloridrato de Sertralina 50mg", categoria: "Controlado", tarja: "Preta", lote: "L9012", validade: "2027-08-30", preco: 65.00, estoque: 12, imagem: "https://cdn-icons-png.flaticon.com/512/884/884488.png" },  
{ id: 6, ean: "789101112006", nome: "Omeprazol 20mg", categoria: "Gástrico", tarja: "Livre", lote: "L4050", validade: "2026-12-05", preco: 18.50, estoque: 50, imagem: "https://cdn-icons-png.flaticon.com/512/884/884488.png" },  
{ id: 7, ean: "789101112007", nome: "Rivotril 2mg (Clonazepam)", categoria: "Psicotrópico", tarja: "Preta", lote: "L5099", validade: "2026-09-12", preco: 45.00, estoque: 6, imagem: "https://cdn-icons-png.flaticon.com/512/884/884488.png" }  
];
let fornecedores = JSON.parse(localStorage.getItem('pharmacontrol_fornecedores')) || [  
{ id: 1, nome: "Profarma Distribuidora S.A.", cnpj: "45.054.119/0001-20", fone: "(71) 3333-4444", prazo: "2 dias úteis" },  
{ id: 2, nome: "Panvel Medicamentos - Laboratório", cnpj: "92.665.611/0001-04", fone: "(51) 3211-9988", prazo: "3 dias úteis" }  
];
let clientes = JSON.parse(localStorage.getItem('pharmacontrol_clientes')) || [  
{ nome: "João da Silva", cpf: "123.456.789-00", fone: "(77) 98888-1111", convenio: "Prefeitura Municipal", limite: 600.00 },  
{ nome: "Mariana Souza", cpf: "987.654.321-11", fone: "(77) 99999-2222", convenio: "Particular", limite: 300.00 }  
];
let funcionarios = JSON.parse(localStorage.getItem('pharmacontrol_funcionarios')) || [  
{ id: 1, nome: "Administrador / Gerente", perfil: "gerente", usuario: "gerente", senha: "123", crf: "N/A", status: "Ativo", permissoes: { estoque: true, caixa: true, cancelarVenda: true, relatorios: true, config: true } },  
{ id: 2, nome: "Dr. Carlos Farmacêutico", perfil: "farmaceutico", usuario: "farmaceutico", senha: "123", crf: "CRF-BA 12345", status: "Ativo", permissoes: { estoque: true, caixa: true, cancelarVenda: false, relatorios: true, config: false } },  
{ id: 3, nome: "João Balconista", perfil: "balconista", usuario: "balconista", senha: "123", crf: "N/A", status: "Ativo", permissoes: { estoque: false, caixa: true, cancelarVenda: false, relatorios: false, config: false } }  
];
let dadosEmpresa = JSON.parse(localStorage.getItem('pharmacontrol_empresa')) || {  
nome: "PHARMACONTROL ENTERPRISE",  
cnpj: "12.345.678/0001-90",  
endereco: "Av. Lindolfo Azevedo Brito, Brumado - BA",  
fone: "(77) 3441-0000",  
crf: "Dr. Carlos - CRF-BA 12345",  
pixChave: "farmacia@pharmacontrol.com.br",  
pixQrCode: ""  
};
let vendasRealizadas = JSON.parse(localStorage.getItem('pharmacontrol_vendas')) || [];  
let avaliacoes = JSON.parse(localStorage.getItem('pharmacontrol_avaliacoes')) || [  
{ nome: "Carlos Eduardo", nota: 5, comentario: "Atendimento impecável e produtos com excelente preço!" },  
{ nome: "Ana Paula", nota: 5, comentario: "Farmácia muito limpa, completa e organizada." }  
];
let carrinho = [];  
let caixaAberto = false;  
let horarioAberturaCaixa = "--:--";  
let saldoInicialCaixa = 0;  
let totalVendasDinheiro = 0;  
let totalVendasOutros = 0;  
let sangriasRealizadas = [];  
let metodoPagamentoAtual = 'pix';  
let usuarioLogado = { nome: "Administrador / Gerente", perfil: "gerente", permissoes: { estoque: true, caixa: true, cancelarVenda: true, relatorios: true, config: true } };
let mostrarImagensNoPDV = true;  
let historicoAbas = ['home'];  
let indiceHistorico = 0;
let acaoPendenteAuth = null;
function salvarTudoStorage() {  
localStorage.setItem('pharmacontrol_produtos', JSON.stringify(produtos));  
localStorage.setItem('pharmacontrol_fornecedores', JSON.stringify(fornecedores));  
localStorage.setItem('pharmacontrol_clientes', JSON.stringify(clientes));  
localStorage.setItem('pharmacontrol_funcionarios', JSON.stringify(funcionarios));  
localStorage.setItem('pharmacontrol_empresa', JSON.stringify(dadosEmpresa));  
localStorage.setItem('pharmacontrol_vendas', JSON.stringify(vendasRealizadas));  
localStorage.setItem('pharmacontrol_avaliacoes', JSON.stringify(avaliacoes));  
}
// SISTEMA DE AUTORIZAÇÃO POR SENHA  
function solicitarAutorizacaoGerente(descricao, callback) {  
document.getElementById('auth-modal-descricao').innerText = descricao || "Esta operação requer senha de gerente ou colaborador autorizado.";  
document.getElementById('auth-password-input').value = '';  
acaoPendenteAuth = callback;  
document.getElementById('auth-modal').style.display = 'flex';  
setTimeout(() => document.getElementById('auth-password-input').focus(), 100);  
}
function fecharModalAuth() {  
document.getElementById('auth-modal').style.display = 'none';  
acaoPendenteAuth = null;  
}
function confirmarAutorizacaoSenha(e) {  
e.preventDefault();  
let senhaDigitada = document.getElementById('auth-password-input').value;  
let funcValid = funcionarios.find(f => f.senha === senhaDigitada && f.status === 'Ativo');
    if (funcValid) {  
        fecharModalAuth();  
        if (acaoPendenteAuth) acaoPendenteAuth();  
    } else {  
        alert('Senha incorreta! Acesso negado.');  
    }  
}
window.addEventListener('hashchange', verificarRotaURL);
function verificarRotaURL() {  
let hash = window.location.hash;  
if (hash === '#orcamento-cliente') {  
document.getElementById('login-screen').style.display = 'none';  
document.getElementById('app-sidebar').style.display = 'none';  
document.getElementById('app-top-header').style.display = 'none';  
document.getElementById('app-main-content').style.marginLeft = '0';  
switchTab('orcamentocliente', false);  
}  
}
function alternarModoEscuro() {  
document.body.classList.toggle('dark-mode');  
let icone = document.getElementById('dark-icon');  
if(document.body.classList.contains('dark-mode')) {  
icone.className = "fa-solid fa-sun";  
} else {  
icone.className = "fa-solid fa-moon";  
}  
}
function realizarLogin(e) {  
e.preventDefault();  
let select = document.getElementById('login-user-select').value;  
let funcMatch = funcionarios.find(f => f.usuario === select && f.status === "Ativo");
    if(funcMatch) {  
        usuarioLogado = { nome: funcMatch.nome, perfil: funcMatch.perfil, permissoes: funcMatch.permissoes || { estoque: true, caixa: true, cancelarVenda: true, relatorios: true, config: true } };  
    } else {  
        usuarioLogado = { nome: "Administrador / Gerente", perfil: "gerente", permissoes: { estoque: true, caixa: true, cancelarVenda: true, relatorios: true, config: true } };  
    }  
  
    document.getElementById('logged-user-label').innerText = usuarioLogado.perfil.toUpperCase();  
    document.getElementById('header-user-name').innerText = usuarioLogado.nome;  
    document.getElementById('login-screen').style.display = 'none';  
  
    atualizarDashboard();  
}
function preencherSenhaPadrao() {  
document.getElementById('login-pass').value = "123";  
}
function logout() {  
document.getElementById('login-screen').style.display = 'flex';  
document.getElementById('login-pass').value = '';  
}
function switchTab(tabId, registrarHistorico = true) {  
document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));  
document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');  
  
    const titles = {  
        'home': 'Página Inicial - Central de Comandos',  
        'dashboard': 'Dashboard Geral',  
        'pdv': 'Frente de Caixa (PDV)',  
        'caixa': 'Gestão e Fechamento de Caixa',  
        'estoque': 'Controle de Estoque, Lotes e SNGPC',  
        'curvaabc': 'Curva ABC de Medicamentos',  
        'comissoes': 'Cálculo de Comissões de Vendedores',  
        'sorteio': 'Sorteio de Brindes para Clientes',  
        'orcamentocliente': 'Orçamento Exclusivo para Clientes (WhatsApp)',  
        'funcionarios': 'Gestão de Funcionários & Permissões',  
        'compras': 'Compras & Fornecedores',  
        'clientes': 'Clientes & Crediário',  
        'empresa': 'Configurações da Empresa & PIX',  
        'relatorios': 'DRE & Relatórios Financeiros',  
        'vendas': 'Histórico de Transações',  
        'avaliacoes': 'Avaliações de Clientes'  
    };  
    document.getElementById('page-title').innerText = titles[tabId] || 'PharmaControl';  
  
    let navBtns = document.querySelectorAll('.nav-item');  
    navBtns.forEach(btn => {  
        if(btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {  
            btn.classList.add('active');  
        }  
    });  
  
    if (registrarHistorico && window.location.hash !== '#orcamento-cliente') {  
        if (historicoAbas[indiceHistorico] !== tabId) {  
            historicoAbas = historicoAbas.slice(0, indiceHistorico + 1);  
            historicoAbas.push(tabId);  
            indiceHistorico = historicoAbas.length - 1;  
        }  
    }  
  
    if(tabId === 'pdv') {  
        renderizarProdutosPDV();  
        atualizarSelectVendedoresPDV();  
        setTimeout(() => document.getElementById('pdv-search').focus(), 100);  
    }  
    if(tabId === 'estoque') renderizarEstoque();  
    if(tabId === 'curvaabc') renderizarCurvaABC();  
    if(tabId === 'funcionarios') renderizarFuncionarios();  
    if(tabId === 'compras') renderizarFornecedores();  
    if(tabId === 'clientes') renderizarClientes();  
    if(tabId === 'empresa') carregarDadosEmpresaForm();  
    if(tabId === 'comissoes') renderizarComissoes();  
    if(tabId === 'sorteio') carregarSelectSorteio();  
    if(tabId === 'orcamentocliente') prepararAbaOrcamentoCliente();  
    if(tabId === 'caixa') atualizarInterfaceCaixa();  
    if(tabId === 'relatorios') renderizarRelatorios();  
    if(tabId === 'vendas') renderizarHistoricoVendas();  
    if(tabId === 'avaliacoes') renderizarAvaliacoes();  
    atualizarDashboard();  
}
function navegarHistorico(direcao) {  
let novoIndice = indiceHistorico + direcao;  
if (novoIndice >= 0 && novoIndice < historicoAbas.length) {  
indiceHistorico = novoIndice;  
switchTab(historicoAbas[indiceHistorico], false);  
}  
}
window.onload = function() {  
salvarTudoStorage();  
atualizarDashboard();  
renderizarProdutosPDV();  
renderizarEstoque();  
renderizarFuncionarios();  
renderizarFornecedores();  
renderizarClientes();  
renderizarAvaliacoes();  
atualizarInterfaceCaixa();
    if (window.location.hash === '#orcamento-cliente') {  
        verificarRotaURL();  
    }  
};
function atualizarDashboard() {  
let totalVendasDia = vendasRealizadas.filter(v => !v.cancelada).reduce((acc, v) => acc + v.total, 0);  
document.getElementById('dash-total-vendas').innerText = `R$ ${totalVendasDia.toFixed(2)}`;  
document.getElementById('dash-total-itens').innerText = produtos.length;
    let estoqueBaixo = produtos.filter(p => p.estoque < 10).length;  
    document.getElementById('dash-estoque-baixo').innerText = estoqueBaixo;  
  
    let hoje = new Date();  
    let vencidosProximos = produtos.filter(p => {  
        let val = new Date(p.validade);  
        let diffDias = (val - hoje) / (1000 * 60 * 60 * 24);  
        return diffDias <= 120;  
    }).length;  
    document.getElementById('dash-vencimento').innerText = vencidosProximos;  
  
    let tbody = document.getElementById('dash-recent-sales');  
    let vendasValidas = vendasRealizadas.filter(v => !v.cancelada);  
    if(vendasValidas.length === 0) {  
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Nenhuma venda realizada hoje.</td></tr>`;  
    } else {  
        tbody.innerHTML = vendasValidas.slice(-5).reverse().map(v => `  
            <tr>  
                <td>#${v.id}</td>  
                <td>${v.horario.split(' ')[1] || v.horario}</td>  
                <td>${v.vendedor}</td>  
                <td>${v.pagamento.toUpperCase()}</td>  
                <td><strong>R$ ${v.total.toFixed(2)}</strong></td>  
            </tr>  
        `).join('');  
    }  
}
function carregarDadosEmpresaForm() {  
document.getElementById('empresa-nome').value = dadosEmpresa.nome;  
document.getElementById('empresa-cnpj').value = dadosEmpresa.cnpj;  
document.getElementById('empresa-endereco').value = dadosEmpresa.endereco;  
document.getElementById('empresa-fone').value = dadosEmpresa.fone;  
document.getElementById('empresa-crf').value = dadosEmpresa.crf;  
document.getElementById('empresa-pix-chave').value = dadosEmpresa.pixChave || "farmacia@pharmacontrol.com.br";  
document.getElementById('empresa-pix-qrcode').value = dadosEmpresa.pixQrCode || "";
    let qrImg = document.getElementById('preview-qr-img');  
    if(dadosEmpresa.pixQrCode) {  
        qrImg.src = dadosEmpresa.pixQrCode;  
        qrImg.style.display = 'block';  
    } else {  
        qrImg.style.display = 'none';  
    }  
    document.getElementById('preview-pix-text').innerText = `Chave PIX: ${dadosEmpresa.pixChave}`;  
}
function salvarDadosEmpresa(e) {  
e.preventDefault();  
solicitarAutorizacaoGerente("Alterar dados da empresa e chave PIX exige autorização.", () => {  
dadosEmpresa.nome = document.getElementById('empresa-nome').value;  
dadosEmpresa.cnpj = document.getElementById('empresa-cnpj').value;  
dadosEmpresa.endereco = document.getElementById('empresa-endereco').value;  
dadosEmpresa.fone = document.getElementById('empresa-fone').value;  
dadosEmpresa.crf = document.getElementById('empresa-crf').value;  
dadosEmpresa.pixChave = document.getElementById('empresa-pix-chave').value;  
dadosEmpresa.pixQrCode = document.getElementById('empresa-pix-qrcode').value;
        document.getElementById('rec-empresa-nome').innerText = dadosEmpresa.nome;  
        document.getElementById('rec-empresa-cnpj').innerText = `CNPJ: ${dadosEmpresa.cnpj}`;  
        document.getElementById('rec-empresa-end').innerText = dadosEmpresa.endereco;  
        document.getElementById('rec-empresa-tel').innerText = `Tel: ${dadosEmpresa.fone}`;  
  
        carregarDadosEmpresaForm();  
        salvarTudoStorage();  
        alert('Configurações da empresa e PIX atualizadas com sucesso!');  
    });  
}
function renderizarFuncionarios() {  
let tbody = document.getElementById('employees-table-body');  
tbody.innerHTML = funcionarios.map(f => {  
let p = f.permissoes || { estoque: true, caixa: true, cancelarVenda: false, relatorios: false, config: false };  
let tagsPerm = [];  
if(p.estoque) tagsPerm.push("Estoque");  
if(p.caixa) tagsPerm.push("PDV");  
if(p.cancelarVenda) tagsPerm.push("Cancelar Venda");  
if(p.relatorios) tagsPerm.push("Relatórios");  
if(p.config) tagsPerm.push("Config");
        return `  
            <tr>  
                <td><strong>${f.nome}</strong></td>  
                <td>${f.perfil.toUpperCase()}</td>  
                <td>${f.usuario}</td>  
                <td><small style="color:var(--primary); font-weight:600;">${tagsPerm.join(', ') || 'Nenhuma'}</small></td>  
                <td><span class="badge ${f.status === 'Ativo' ? 'verde' : 'vermelho'}">${f.status}</span></td>  
                <td>  
                    <button class="btn btn-outline" style="padding:4px 8px;" onclick="editarFuncionario(${f.id})"><i class="fa-solid fa-pen"></i></button>  
                    <button class="btn btn-outline" style="padding:4px 8px; color:var(--danger); border-color:var(--danger);" onclick="excluirFuncionario(${f.id})"><i class="fa-solid fa-trash"></i></button>  
                </td>  
            </tr>  
        `;  
    }).join('');  
}
function abrirModalNovoFuncionario() {  
document.getElementById('emp-id').value = '';  
document.getElementById('emp-name').value = '';  
document.getElementById('emp-usuario').value = '';  
document.getElementById('emp-senha').value = '';  
document.getElementById('emp-crf').value = '';  
document.getElementById('perm-estoque').checked = true;  
document.getElementById('perm-caixa').checked = true;  
document.getElementById('perm-cancelar').checked = false;  
document.getElementById('perm-relatorios').checked = false;  
document.getElementById('perm-config').checked = false;  
document.getElementById('employee-modal-title').innerHTML = `<i class="fa-solid fa-user-plus"></i> Cadastrar Funcionário`;  
document.getElementById('employee-modal').style.display = 'flex';  
}
function fecharModalFuncionario() {  
document.getElementById('employee-modal').style.display = 'none';  
}
function editarFuncionario(id) {  
let f = funcionarios.find(item => item.id === id);  
if(f) {  
document.getElementById('emp-id').value = f.id;  
document.getElementById('emp-name').value = f.nome;  
document.getElementById('emp-perfil').value = f.perfil;  
document.getElementById('emp-usuario').value = f.usuario;  
document.getElementById('emp-senha').value = f.senha;  
document.getElementById('emp-crf').value = f.crf || '';  
document.getElementById('emp-status').value = f.status;
        let p = f.permissoes || {};  
        document.getElementById('perm-estoque').checked = !!p.estoque;  
        document.getElementById('perm-caixa').checked = !!p.caixa;  
        document.getElementById('perm-cancelar').checked = !!p.cancelarVenda;  
        document.getElementById('perm-relatorios').checked = !!p.relatorios;  
        document.getElementById('perm-config').checked = !!p.config;  
  
        document.getElementById('employee-modal-title').innerHTML = `<i class="fa-solid fa-user-pen"></i> Editar Funcionário & Permissões`;  
        document.getElementById('employee-modal').style.display = 'flex';  
    }  
}
function salvarFuncionario(e) {  
e.preventDefault();  
solicitarAutorizacaoGerente("Modificar cadastros ou permissões de colaboradores exige senha gerencial.", () => {  
let id = document.getElementById('emp-id').value;  
let nome = document.getElementById('emp-name').value;  
let perfil = document.getElementById('emp-perfil').value;  
let usuario = document.getElementById('emp-usuario').value;  
let senha = document.getElementById('emp-senha').value;  
let crf = document.getElementById('emp-crf').value;  
let status = document.getElementById('emp-status').value;
        let permissoes = {  
            estoque: document.getElementById('perm-estoque').checked,  
            caixa: document.getElementById('perm-caixa').checked,  
            cancelarVenda: document.getElementById('perm-cancelar').checked,  
            relatorios: document.getElementById('perm-relatorios').checked,  
            config: document.getElementById('perm-config').checked  
        };  
  
        if(id) {  
            let f = funcionarios.find(item => item.id == id);  
            if(f) {  
                f.nome = nome;  
                f.perfil = perfil;  
                f.usuario = usuario;  
                f.senha = senha;  
                f.crf = crf;  
                f.status = status;  
                f.permissoes = permissoes;  
            }  
        } else {  
            let novoId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1;  
            funcionarios.push({ id: novoId, nome, perfil, usuario, senha, crf, status, permissoes });  
        }  
  
        salvarTudoStorage();  
        atualizarSelectLogin();  
        atualizarSelectVendedoresPDV();  
        fecharModalFuncionario();  
        renderizarFuncionarios();  
        alert('Funcionário e permissões salvos com sucesso!');  
    });  
}
function excluirFuncionario(id) {  
solicitarAutorizacaoGerente("Excluir colaborador requer senha.", () => {  
funcionarios = funcionarios.filter(f => f.id !== id);  
salvarTudoStorage();  
atualizarSelectLogin();  
atualizarSelectVendedoresPDV();  
renderizarFuncionarios();  
});  
}
function atualizarSelectLogin() {  
let select = document.getElementById('login-user-select');  
select.innerHTML = funcionarios.filter(f => f.status === 'Ativo').map(f => `  <option value="${f.usuario}">${f.nome} (${f.perfil.toUpperCase()})</option>  `).join('');  
}
function atualizarSelectVendedoresPDV() {  
let select = document.getElementById('pdv-vendedor');  
let elegiveis = funcionarios.filter(f => f.status === 'Ativo');  
select.innerHTML = elegiveis.map(f => `  <option value="${f.nome}">${f.nome} (${f.perfil.toUpperCase()})</option>  `).join('');  
}
function renderizarFornecedores() {  
let tbody = document.getElementById('suppliers-table-body');  
tbody.innerHTML = fornecedores.map(f => `  <tr>   <td>#${f.id}</td>   <td><strong>${f.nome}</strong></td>   <td>${f.cnpj}</td>   <td>${f.fone}</td>   <td>${f.prazo}</td>   <td>   <button class="btn btn-outline" style="padding:4px 8px;" onclick="editarFornecedor(${f.id})"><i class="fa-solid fa-pen"></i></button>   <button class="btn btn-outline" style="padding:4px 8px; color:var(--danger); border-color:var(--danger);" onclick="excluirFornecedor(${f.id})"><i class="fa-solid fa-trash"></i></button>   </td>   </tr>  `).join('');  
}
function abrirModalNovoFornecedor() {  
document.getElementById('sup-id').value = '';  
document.getElementById('sup-name').value = '';  
document.getElementById('sup-cnpj').value = '';  
document.getElementById('sup-fone').value = '';  
document.getElementById('sup-prazo').value = '';  
document.getElementById('supplier-modal-title').innerHTML = `<i class="fa-solid fa-truck"></i> Cadastrar Fornecedor`;  
document.getElementById('supplier-modal').style.display = 'flex';  
}
function fecharModalNovoFornecedor() {  
document.getElementById('supplier-modal').style.display = 'none';  
}
function editarFornecedor(id) {  
let f = fornecedores.find(item => item.id === id);  
if(f) {  
document.getElementById('sup-id').value = f.id;  
document.getElementById('sup-name').value = f.nome;  
document.getElementById('sup-cnpj').value = f.cnpj;  
document.getElementById('sup-fone').value = f.fone;  
document.getElementById('sup-prazo').value = f.prazo;  
document.getElementById('supplier-modal-title').innerHTML = `<i class="fa-solid fa-truck-field"></i> Editar Fornecedor`;  
document.getElementById('supplier-modal').style.display = 'flex';  
}  
}
function salvarNovoFornecedor(e) {  
e.preventDefault();  
solicitarAutorizacaoGerente("Cadastrar ou editar fornecedor requer senha de autorização.", () => {  
let id = document.getElementById('sup-id').value;  
let nome = document.getElementById('sup-name').value;  
let cnpj = document.getElementById('sup-cnpj').value;  
let fone = document.getElementById('sup-fone').value;  
let prazo = document.getElementById('sup-prazo').value;
        if(id) {  
            let f = fornecedores.find(item => item.id == id);  
            if(f) {  
                f.nome = nome;  
                f.cnpj = cnpj;  
                f.fone = fone;  
                f.prazo = prazo;  
            }  
        } else {  
            let novoId = fornecedores.length > 0 ? Math.max(...fornecedores.map(f => f.id)) + 1 : 1;  
            fornecedores.push({ id: novoId, nome, cnpj, fone, prazo });  
        }  
  
        salvarTudoStorage();  
        fecharModalNovoFornecedor();  
        renderizarFornecedores();  
        alert('Fornecedor salvo com sucesso!');  
    });  
}
function excluirFornecedor(id) {  
solicitarAutorizacaoGerente("Excluir fornecedor requer senha.", () => {  
fornecedores = fornecedores.filter(f => f.id !== id);  
salvarTudoStorage();  
renderizarFornecedores();  
});  
}
function renderizarClientes() {  
let tbody = document.getElementById('clients-table-body');  
tbody.innerHTML = clientes.map((c, index) => `  <tr>   <td><strong>${c.nome}</strong></td>   <td>${c.cpf}</td>   <td>${c.fone}</td>   <td>${c.convenio}</td>   <td>R$ ${c.limite.toFixed(2)}</td>   <td>   <button class="btn btn-outline" style="padding:4px 8px;" onclick="editarCliente(${index})"><i class="fa-solid fa-pen"></i></button>   <button class="btn btn-outline" style="padding:4px 8px; color:var(--danger); border-color:var(--danger);" onclick="excluirCliente(${index})"><i class="fa-solid fa-trash"></i></button>   </td>   </tr>  `).join('');  
}
function abrirModalNovoCliente() {  
document.getElementById('cli-index').value = '';  
document.getElementById('cli-name').value = '';  
document.getElementById('cli-cpf').value = '';  
document.getElementById('cli-fone').value = '';  
document.getElementById('cli-convenio').value = '';  
document.getElementById('cli-limite').value = '';  
document.getElementById('client-modal-title').innerHTML = `<i class="fa-solid fa-user-plus"></i> Cadastrar Cliente`;  
document.getElementById('client-modal').style.display = 'flex';  
}
function fecharModalNovoCliente() {  
document.getElementById('client-modal').style.display = 'none';  
}
function editarCliente(index) {  
let c = clientes[index];  
if(c) {  
document.getElementById('cli-index').value = index;  
document.getElementById('cli-name').value = c.nome;  
document.getElementById('cli-cpf').value = c.cpf;  
document.getElementById('cli-fone').value = c.fone;  
document.getElementById('cli-convenio').value = c.convenio;  
document.getElementById('cli-limite').value = c.limite;  
document.getElementById('client-modal-title').innerHTML = `<i class="fa-solid fa-user-pen"></i> Editar Cliente`;  
document.getElementById('client-modal').style.display = 'flex';  
}  
}
function salvarNovoCliente(e) {  
e.preventDefault();  
let index = document.getElementById('cli-index').value;  
let nome = document.getElementById('cli-name').value;  
let cpf = document.getElementById('cli-cpf').value;  
let fone = document.getElementById('cli-fone').value;  
let convenio = document.getElementById('cli-convenio').value || 'Particular';  
let limite = parseFloat(document.getElementById('cli-limite').value);
    if(index !== '') {  
        clientes[index] = { nome, cpf, fone, convenio, limite };  
    } else {  
        clientes.push({ nome, cpf, fone, convenio, limite });  
    }  
  
    salvarTudoStorage();  
    fecharModalNovoCliente();  
    renderizarClientes();  
    alert('Cliente salvo com sucesso!');  
}
function excluirCliente(index) {  
if(confirm('Deseja excluir este cliente?')) {  
clientes.splice(index, 1);  
salvarTudoStorage();  
renderizarClientes();  
}  
}
function renderizarComissoes() {  
let tbody = document.getElementById('comissoes-table-body');  
let perc = parseFloat(document.getElementById('input-comissao-perc').value) || 0;
    let vendedores = funcionarios.filter(f => f.status === 'Ativo');  
  
    if(vendedores.length === 0) {  
        tbody.innerHTML = `<tr><td colspan="4" class="text-center">Nenhum funcionário ativo cadastrado.</td></tr>`;  
        return;  
    }  
  
    tbody.innerHTML = vendedores.map(v => {  
        let vendasVendedor = vendasRealizadas.filter(vend => vend.vendedor === v.nome && !vend.cancelada);  
        let totalFaturamentoVendedor = vendasVendedor.reduce((acc, vend) => acc + vend.total, 0);  
        let comissaoVal = totalFaturamentoVendedor * (perc / 100);  
  
        return `  
            <tr>  
                <td><strong>${v.nome}</strong> (${v.perfil.toUpperCase()})</td>  
                <td>R$ ${totalFaturamentoVendedor.toFixed(2)}</td>  
                <td>${perc}%</td>  
                <td><strong style="color: var(--primary);">R$ ${comissaoVal.toFixed(2)}</strong></td>  
            </tr>  
        `;  
    }).join('');  
}
function carregarSelectSorteio() {  
let select = document.getElementById('sorteio-produto-select');  
select.innerHTML = produtos.map(p => `  <option value="${p.id}">${p.nome} (Estoque: ${p.estoque} un. - R$ ${p.preco.toFixed(2)})</option>  `).join('');  
document.getElementById('resultado-sorteio-box').style.display = 'none';  
}
function realizarSorteioCliente() {  
if(clientes.length === 0) {  
alert('Não há clientes cadastrados para realizar o sorteio.');  
return;  
}  
if(produtos.length === 0) {  
alert('Não há produtos no estoque para sortear.');  
return;  
}
    let prodId = document.getElementById('sorteio-produto-select').value;  
    let produtoSorteado = produtos.find(p => p.id == prodId);  
  
    let randomIndex = Math.floor(Math.random() * clientes.length);  
    let clienteSorteado = clientes[randomIndex];  
  
    document.getElementById('sorteio-vencedor-nome').innerText = `🎉 ${clienteSorteado.nome} 🎉`;  
    document.getElementById('sorteio-detalhes-premio').innerHTML = `CPF: ${clienteSorteado.cpf} | Tel: ${clienteSorteado.fone}<br><strong>Prêmio Sorteado:</strong> ${produtoSorteado.nome}`;  
    document.getElementById('resultado-sorteio-box').style.display = 'block';  
}
function prepararAbaOrcamentoCliente() {  
let container = document.getElementById('public-budget-product-list');  
let baseURL = window.location.href.split('#')[0];  
let linkExclusivo = `${baseURL}#orcamento-cliente`;  
document.getElementById('client-shareable-url').innerText = linkExclusivo;
    container.innerHTML = produtos.map(p => `  
        <div class="checkbox-item">  
            <input type="checkbox" value="${p.id}" id="pub-prod-${p.id}" data-price="${p.preco}" data-name="${p.nome}">  
            <label for="pub-prod-${p.id}">${p.nome} - R$ ${p.preco.toFixed(2)} ${p.estoque > 0 ? '(Disponível)' : '(Sob Encomenda)'}</label>  
        </div>  
    `).join('');  
}
function copiarLinkOrcamentoCliente() {  
let linkText = document.getElementById('client-shareable-url').innerText;  
navigator.clipboard.writeText(linkText).then(() => {  
alert('Link exclusivo copiado com sucesso! Cole no WhatsApp do cliente.');  
});  
}
function enviarOrcamentoClientePublico(e) {  
e.preventDefault();  
let nomeCliente = document.getElementById('cli-orc-nome').value;  
let fone = document.getElementById('cli-orc-fone').value;
    let checkboxes = document.querySelectorAll('#public-budget-product-list input[type="checkbox"]:checked');  
    if(checkboxes.length === 0) {  
        alert('Selecione pelo menos um produto para o orçamento.');  
        return;  
    }  
  
    let itensOrcamento = [];  
    let totalOrcamento = 0;  
    checkboxes.forEach(cb => {  
        let nome = cb.getAttribute('data-name');  
        let preco = parseFloat(cb.getAttribute('data-price'));  
        itensOrcamento.push(`- ${nome}: R$ ${preco.toFixed(2)}`);  
        totalOrcamento += preco;  
    });  
  
    let mensagem = `Olá, meu nome é *${nomeCliente}* e gostaria de solicitar um orçamento na *${dadosEmpresa.nome}*:%0D%0A%0D%0A` +  
                   itensOrcamento.join('%0D%0A') +   
                   `%0D%0A%0D%0A*Total Estimado: R$ ${totalOrcamento.toFixed(2)}*`;  
  
    window.open(`https://wa.me/5577999999999?text=${mensagem}`, '_blank');  
}
// GESTÃO DE CAIXA & RELATÓRIOS TÉRMICOS (SIMPLES E DETALHADO)  
function abrirCaixaSistema() {  
let fundo = parseFloat(document.getElementById('input-fundo-troco').value);  
if(isNaN(fundo) || fundo < 0) {  
alert('Informe um valor de fundo de troco válido.');  
return;  
}  
caixaAberto = true;  
horarioAberturaCaixa = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  
saldoInicialCaixa = fundo;  
totalVendasDinheiro = 0;  
totalVendasOutros = 0;  
sangriasRealizadas = [];  
atualizarInterfaceCaixa();  
alert('Turno de caixa aberto com sucesso!');  
}
function obterProdutosVendidosNoTurno() {  
let vendasValidas = vendasRealizadas.filter(v => !v.cancelada);  
let mapaProdutos = {};
    vendasValidas.forEach(v => {  
        v.itens.forEach(item => {  
            if(!mapaProdutos[item.id]) {  
                mapaProdutos[item.id] = { nome: item.nome, qtd: 0, faturamento: 0 };  
            }  
            mapaProdutos[item.id].qtd += item.qtd;  
            mapaProdutos[item.id].faturamento += (item.qtd * item.preco);  
        });  
    });  
  
    return Object.values(mapaProdutos);  
}
function atualizarInterfaceCaixa() {  
let badge = document.getElementById('status-caixa-badge');  
let titulo = document.getElementById('caixa-estado-titulo');  
let controleAberto = document.getElementById('caixa-controles-aberto');  
let controleFechado = document.getElementById('caixa-controles-fechado');  
let relatorioBox = document.getElementById('caixa-relatorio-produtos-box');
    document.getElementById('caixa-hora-abertura').innerText = horarioAberturaCaixa;  
    document.getElementById('caixa-saldo-inicial').innerText = `R$ ${saldoInicialCaixa.toFixed(2)}`;  
    document.getElementById('caixa-vendas-dinheiro').innerText = `R$ ${totalVendasDinheiro.toFixed(2)}`;  
    document.getElementById('caixa-vendas-outros').innerText = `R$ ${totalVendasOutros.toFixed(2)}`;  
      
    let totalSangrias = sangriasRealizadas.reduce((acc, s) => acc + s.valor, 0);  
    let totalEmCaixa = saldoInicialCaixa + totalVendasDinheiro - totalSangrias;  
    document.getElementById('caixa-total-atual').innerText = `R$ ${totalEmCaixa.toFixed(2)}`;  
  
    if(caixaAberto) {  
        badge.innerText = "ABERTO";  
        badge.className = "badge verde";  
        titulo.innerText = "TURNO DE CAIXA ABERTO E OPERANTE";  
        controleAberto.style.display = 'flex';  
        controleFechado.style.display = 'none';  
        relatorioBox.style.display = 'block';  
  
        let produtosVendidos = obterProdutosVendidosNoTurno();  
        let tbody = document.getElementById('caixa-produtos-vendidos-tbody');  
        if(produtosVendidos.length === 0) {  
            tbody.innerHTML = `<tr><td colspan="3" class="text-center">Nenhum produto vendido neste turno ainda.</td></tr>`;  
        } else {  
            tbody.innerHTML = produtosVendidos.map(p => `  
                <tr>  
                    <td><strong>${p.nome}</strong></td>  
                    <td><span class="badge verde">${p.qtd} un.</span></td>  
                    <td>R$ ${p.faturamento.toFixed(2)}</td>  
                </tr>  
            `).join('');  
        }  
    } else {  
        badge.innerText = "FECHADO";  
        badge.className = "badge vermelho";  
        titulo.innerText = "CAIXA FECHADO";  
        controleAberto.style.display = 'none';  
        controleFechado.style.display = 'block';  
        relatorioBox.style.display = 'none';  
    }  
}
function abrirModalSangria() { document.getElementById('sangria-modal').style.display = 'flex'; }  
function fecharModalSangria() { document.getElementById('sangria-modal').style.display = 'none'; }
function realizarSangria() {  
let valor = parseFloat(document.getElementById('sangria-valor').value);  
let motivo = document.getElementById('sangria-motivo').value;  
if(isNaN(valor) || valor <= 0 || !motivo) {  
alert('Preencha o valor e o motivo.');  
return;  
}  
sangriasRealizadas.push({ valor, motivo });  
salvarTudoStorage();  
fecharModalSangria();  
atualizarInterfaceCaixa();  
alert('Sangria efetuada com sucesso!');  
}
function imprimirRelatorioSimples() {  
let totalSangrias = sangriasRealizadas.reduce((acc, s) => acc + s.valor, 0);  
let faturamentoTotal = totalVendasDinheiro + totalVendasOutros;  
let totalEmCaixa = saldoInicialCaixa + totalVendasDinheiro - totalSangrias;
    let corpoRelatorio = `  
        <p class="text-center"><strong>RELATÓRIO DE CAIXA - SIMPLES</strong></p>  
        <p><strong>Abertura:</strong> ${horarioAberturaCaixa} | <strong>Fechamento:</strong> ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>  
        <p><strong>Operador:</strong> ${usuarioLogado.nome}</p>  
        <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">  
        <p><strong>Fundo de Troco Inicial:</strong> R$ ${saldoInicialCaixa.toFixed(2)}</p>  
        <p><strong>Vendas em Dinheiro:</strong> R$ ${totalVendasDinheiro.toFixed(2)}</p>  
        <p><strong>Vendas em Outros (PIX/Cartão):</strong> R$ ${totalVendasOutros.toFixed(2)}</p>  
        <p><strong>Total de Sangrias (-):</strong> R$ ${totalSangrias.toFixed(2)}</p>  
        <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">  
        <p><strong>Faturamento Bruto:</strong> R$ ${faturamentoTotal.toFixed(2)}</p>  
        <p><strong>Espécie Esperada no Gaveteiro:</strong> R$ ${totalEmCaixa.toFixed(2)}</p>  
        <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">  
        <p class="text-center"><small>${dadosEmpresa.nome}</small></p>  
    `;  
  
    document.getElementById('rec-titulo-documento').innerText = "RELATÓRIO SIMPLES DE CAIXA";  
    document.getElementById('receipt-body').innerHTML = corpoRelatorio;  
    document.getElementById('receipt-modal').style.display = 'flex';  
}
function imprimirRelatorioDetalhado() {  
let vendasValidas = vendasRealizadas.filter(v => !v.cancelada);  
let totalSangrias = sangriasRealizadas.reduce((acc, s) => acc + s.valor, 0);  
let faturamentoTotal = vendasValidas.reduce((acc, v) => acc + v.total, 0);
    let vendasHtml = vendasValidas.length === 0 ? '<p class="text-center">Nenhuma venda registrada.</p>' : vendasValidas.map(v => `  
        <div style="margin-bottom: 12px; border-bottom: 1px dotted #cbd5e1; padding-bottom: 6px;">  
            <p><strong>Cupom #${v.id}</strong> | ${v.horario}</p>  
            <p><strong>Vendedor:</strong> ${v.vendedor}</p>  
            <p><strong>Cliente:</strong> ${v.cliente} (CPF: ${v.cpf})</p>  
            <p><strong>Pagamento:</strong> ${v.pagamento.toUpperCase()}</p>  
            <table style="width:100%; font-size: 0.75rem; margin-top:4px;">  
                <tr><th>Item</th><th>Qtd</th><th>Unit.</th><th>Subtotal</th></tr>  
                ${v.itens.map(i => `<tr><td>${i.nome}</td><td>${i.qtd}x</td><td>R$ ${i.preco.toFixed(2)}</td><td>R$ ${(i.qtd * i.preco).toFixed(2)}</td></tr>`).join('')}  
            </table>  
            <p style="text-align: right; margin-top: 4px;"><strong>Total Cupom: R$ ${v.total.toFixed(2)}</strong></p>  
        </div>  
    `).join('');  
  
    let corpoRelatorio = `  
        <p class="text-center"><strong>RELATÓRIO DETALHADO DE CAIXA</strong></p>  
        <p><strong>Abertura:</strong> ${horarioAberturaCaixa} | <strong>Operador:</strong> ${usuarioLogado.nome}</p>  
        <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">  
        <p><strong>Fundo Inicial:</strong> R$ ${saldoInicialCaixa.toFixed(2)}</p>  
        <p><strong>Total Sangrias:</strong> R$ ${totalSangrias.toFixed(2)}</p>  
        <p><strong>Faturamento Geral:</strong> R$ ${faturamentoTotal.toFixed(2)}</p>  
        <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">  
        <p class="text-center"><strong>TRANSAÇÕES E PRODUTOS VENDIDOS</strong></p>  
        <div style="max-height: 280px; overflow-y: auto; margin-top: 5px;">  
            ${vendasHtml}  
        </div>  
        <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">  
        <p class="text-center"><small>${dadosEmpresa.nome} - Controle de Turno</small></p>  
    `;  
  
    document.getElementById('rec-titulo-documento').innerText = "RELATÓRIO DETALHADO - TURNO";  
    document.getElementById('receipt-body').innerHTML = corpoRelatorio;  
    document.getElementById('receipt-modal').style.display = 'flex';  
}
function fecharCaixaSistema() {  
let totalSangrias = sangriasRealizadas.reduce((acc, s) => acc + s.valor, 0);  
let totalEsperadoEspecie = saldoInicialCaixa + totalVendasDinheiro - totalSangrias;
    let contagem = prompt(`FECHAMENTO DE CAIXA:\n\nValor esperado em Espécie no caixa: R$ ${totalEsperadoEspecie.toFixed(2)}\n\nDigite o valor apurado no gaveteiro:`);  
    if(contagem !== null) {  
        let valorApurado = parseFloat(contagem) || 0;  
        let diferenca = valorApurado - totalEsperadoEspecie;  
        let statusDif = diferenca === 0 ? "Caixa Bateu Perfeitamente!" : (diferenca > 0 ? `Sobra de R$ ${diferenca.toFixed(2)}` : `Falta de R$ ${Math.abs(diferenca).toFixed(2)}`);  
          
        imprimirRelatorioDetalhado();  
  
        alert(`FECHAMENTO CONCLUÍDO!\n\nEsperado: R$ ${totalEsperadoEspecie.toFixed(2)}\nApurado: R$ ${valorApurado.toFixed(2)}\nStatus: ${statusDif}`);  
          
        caixaAberto = false;  
        atualizarInterfaceCaixa();  
    }  
}
// CÂMERA & BIPE  
function abrirLeitorCamera() { document.getElementById('camera-modal').style.display = 'flex'; }  
function fecharLeitorCamera() { document.getElementById('camera-modal').style.display = 'none'; }  
function simularLeituraSucesso() {  
fecharLeitorCamera();  
if(produtos.length > 0) {  
adicionarAoCarrinho(produtos[0].id);  
alert(`Bipado com sucesso: ${produtos[0].nome}! Adicionado ao carrinho.`);  
}  
}
function tratarBuscaPDV(event) {  
let inputVal = document.getElementById('pdv-search').value.trim();  
if (event.key === 'Enter') {  
event.preventDefault();  
let produtoEncontrado = produtos.find(p => p.ean === inputVal);  
if (produtoEncontrado) {  
adicionarAoCarrinho(produtoEncontrado.id);  
document.getElementById('pdv-search').value = '';  
renderizarProdutosPDV();  
} else {  
let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(inputVal.toLowerCase()) || p.ean.includes(inputVal));  
if (filtrados.length === 1) {  
adicionarAoCarrinho(filtrados[0].id);  
document.getElementById('pdv-search').value = '';  
renderizarProdutosPDV();  
} else if (filtrados.length === 0) {  
alert('Produto não encontrado para o código ou termo informado.');  
}  
}  
} else {  
setTimeout(() => { renderizarProdutosPDV(document.getElementById('pdv-search').value); }, 10);  
}  
}
function alternarVisibilidadeImagensPDV() {  
mostrarImagensNoPDV = !mostrarImagensNoPDV;  
let btn = document.getElementById('btn-toggle-img');  
btn.innerHTML = mostrarImagensNoPDV ? '<i class="fa-solid fa-image"> Ocultar Imagens' : '<i class="fa-solid fa-image-slash"> Mostrar Imagens';  
renderizarProdutosPDV(document.getElementById('pdv-search').value);  
}
function renderizarProdutosPDV(filtro = '') {  
let container = document.getElementById('pdv-product-list');  
let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()) || p.ean.includes(filtro));
    container.innerHTML = filtrados.map(p => `  
        <div class="product-card float-card" onclick="adicionarAoCarrinho(${p.id})">  
            ${mostrarImagensNoPDV && p.imagem ? `<img src="${p.imagem}" alt="${p.nome}" class="product-thumb">` : ''}  
            <div class="product-info">  
                <span class="badge ${p.tarja.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}">${p.tarja}</span>  
                <h4>${p.nome}</h4>  
                <p>Lote: ${p.lote} | Val: ${p.validade.split('-').reverse().join('/')}</p>  
            </div>  
            <div class="product-price-stock">  
                <span class="price">R$ ${p.preco.toFixed(2)}</span>  
                <small class="text-muted">Est: ${p.estoque}</small>  
            </div>  
        </div>  
    `).join('');  
}
function adicionarAoCarrinho(id) {  
let prod = produtos.find(p => p.id === id);  
if(!prod || prod.estoque <= 0) {  
alert('Produto sem estoque!');  
return;  
}
    let itemCarrinho = carrinho.find(item => item.id === id);  
    if(itemCarrinho) {  
        if(itemCarrinho.qtd < prod.estoque) itemCarrinho.qtd++;  
        else alert('Estoque máximo atingido.');  
    } else {  
        carrinho.push({ id: prod.id, nome: prod.nome, preco: prod.preco, qtd: 1, tarja: prod.tarja, lote: prod.lote });  
    }  
    atualizarCarrinho();  
}
function atualizarCarrinho() {  
let container = document.getElementById('cart-items-container');  
if(carrinho.length === 0) {  
container.innerHTML = `<p class="empty-cart-msg">Carrinho vazio</p>`;  
document.getElementById('interaction-alert-box').style.display = 'none';  
document.getElementById('cart-subtotal').innerText = 'R$ 0,00';  
document.getElementById('cart-total').innerText = 'R$ 0,00';  
return;  
}
    let nomesCarrinho = carrinho.map(i => i.nome.toLowerCase());  
    let temInteracao = nomesCarrinho.some(n => n.includes('sertralina')) && nomesCarrinho.some(n => n.includes('rivotril'));  
    let alertaBox = document.getElementById('interaction-alert-box');  
    if(temInteracao) {  
        alertaBox.style.display = 'flex';  
        alertaBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <strong>Atenção Farmacêutica:</strong> Uso concomitante de Sertralina e Rivotril requer monitoramento médico!`;  
    } else {  
        alertaBox.style.display = 'none';  
    }  
  
    container.innerHTML = carrinho.map((item, index) => `  
        <div class="cart-item">  
            <div>  
                <strong>${item.nome}</strong><br>  
                <small>${item.qtd}x R$ ${item.preco.toFixed(2)} (${item.tarja})</small>  
            </div>  
            <div>  
                <span>R$ ${(item.qtd * item.preco).toFixed(2)}</span>  
                <button onclick="removerDoCarrinho(${index})" class="btn-outline" style="padding:2px 6px; margin-left:8px;"><i class="fa-solid fa-xmark"></i></button>  
            </div>  
        </div>  
    `).join('');  
  
    let subtotal = carrinho.reduce((acc, item) => acc + (item.qtd * item.preco), 0);  
    let desconto = parseFloat(document.getElementById('cart-discount').value) || 0;  
      
    let farmaciaPopular = document.getElementById('pdv-farmacia-popular').checked;  
    if(farmaciaPopular) desconto += 50;  
    if(desconto > 100) desconto = 100;  
  
    let total = subtotal - (subtotal * (desconto / 100));  
  
    document.getElementById('cart-subtotal').innerText = `R$ ${subtotal.toFixed(2)}`;  
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;  
}
function removerDoCarrinho(index) {  
carrinho.splice(index, 1);  
atualizarCarrinho();  
}
function limparCarrinho() {  
carrinho = [];  
document.getElementById('pdv-farmacia-popular').checked = false;  
atualizarCarrinho();  
}
function verificarAntesFinalizar() {  
if(!caixaAberto) {  
alert('Atenção: O caixa está FECHADO. Abra o caixa primeiro.');  
switchTab('caixa');  
return;  
}  
if(carrinho.length === 0) {  
alert('Carrinho vazio.');  
return;  
}
    let temControlado = carrinho.some(item => item.tarja === 'Preta' || item.tarja === 'Vermelha');  
    if(temControlado) {  
        document.getElementById('prescription-modal').style.display = 'flex';  
    } else {  
        abrirModalPagamento();  
    }  
}
function fecharModalReceituario() { document.getElementById('prescription-modal').style.display = 'none'; }
function validarReceituarioEProsseguir() {  
let pac = document.getElementById('rx-paciente').value;  
let med = document.getElementById('rx-medico').value;  
let crm = document.getElementById('rx-crm').value;  
if(!pac || !med || !crm) {  
alert('Preencha os campos obrigatórios da receita ANVISA.');  
return;  
}  
fecharModalReceituario();  
abrirModalPagamento();  
}
function abrirModalPagamento() {  
let subtotal = carrinho.reduce((acc, item) => acc + (item.qtd * item.preco), 0);  
let desconto = parseFloat(document.getElementById('cart-discount').value) || 0;  
if(document.getElementById('pdv-farmacia-popular').checked) desconto += 50;  
if(desconto > 100) desconto = 100;
    let total = subtotal - (subtotal * (desconto / 100));  
  
    document.getElementById('pix-modal-value').innerText = `R$ ${total.toFixed(2)}`;  
    document.getElementById('cartao-modal-value').innerText = `R$ ${total.toFixed(2)}`;  
  
    document.getElementById('modal-pix-key-label').innerText = `Chave PIX: ${dadosEmpresa.pixChave || 'farmacia@pharmacontrol.com.br'}`;  
    let modalQr = document.getElementById('modal-pix-qrcode-img');  
    let modalFall = document.getElementById('modal-pix-fallback-icon');  
    if(dadosEmpresa.pixQrCode) {  
        modalQr.src = dadosEmpresa.pixQrCode;  
        modalQr.style.display = 'block';  
        modalFall.style.display = 'none';  
    } else {  
        modalQr.style.display = 'none';  
        modalFall.style.display = 'block';  
    }  
  
    document.getElementById('payment-modal').style.display = 'flex';  
}
function fecharModalPagamento() { document.getElementById('payment-modal').style.display = 'none'; }
function selecionarMetodo(metodo) {  
metodoPagamentoAtual = metodo;  
document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));  
event.currentTarget.classList.add('active');
    document.getElementById('pay-content-pix').style.display = metodo === 'pix' ? 'block' : 'none';  
    document.getElementById('pay-content-cartao').style.display = metodo === 'cartao' ? 'block' : 'none';  
    document.getElementById('pay-content-dinheiro').style.display = metodo === 'dinheiro' ? 'block' : 'none';  
    document.getElementById('pay-content-convenio').style.display = metodo === 'convenio' ? 'block' : 'none';  
}
function calcularTroco() {  
let subtotal = carrinho.reduce((acc, item) => acc + (item.qtd * item.preco), 0);  
let desconto = parseFloat(document.getElementById('cart-discount').value) || 0;  
if(document.getElementById('pdv-farmacia-popular').checked) desconto += 50;  
if(desconto > 100) desconto = 100;
    let total = subtotal - (subtotal * (desconto / 100));  
    let recebido = parseFloat(document.getElementById('dinheiro-recebido').value) || 0;  
    let troco = recebido - total;  
    document.getElementById('troco-calculado').innerText = troco >= 0 ? `R$ ${troco.toFixed(2)}` : 'Valor insuficiente';  
}
function confirmarPagamentoFinal() {  
let subtotal = carrinho.reduce((acc, item) => acc + (item.qtd * item.preco), 0);  
let desconto = parseFloat(document.getElementById('cart-discount').value) || 0;  
if(document.getElementById('pdv-farmacia-popular').checked) desconto += 50;  
if(desconto > 100) desconto = 100;
    let total = subtotal - (subtotal * (desconto / 100));  
  
    carrinho.forEach(itemCart => {  
        let prod = produtos.find(p => p.id === itemCart.id);  
        if(prod) prod.estoque -= itemCart.qtd;  
    });  
  
    if(metodoPagamentoAtual === 'dinheiro') {  
        totalVendasDinheiro += total;  
    } else {  
        totalVendasOutros += total;  
    }  
  
    let vendedorNome = document.getElementById('pdv-vendedor').value || 'Dr. Carlos Farmacêutico';  
    let clienteNome = document.getElementById('pdv-cliente').value || 'Cliente Balcão';  
    let clienteCpf = document.getElementById('pdv-cpf').value || 'Não informado';  
  
    let novaVenda = {  
        id: Math.floor(1000 + Math.random() * 9000),  
        horario: new Date().toLocaleString(),  
        vendedor: vendedorNome,  
        cliente: clienteNome,  
        cpf: clienteCpf,  
        itens: [...carrinho],  
        pagamento: metodoPagamentoAtual,  
        total: total,  
        cancelada: false  
    };  
  
    vendasRealizadas.push(novaVenda);  
    salvarTudoStorage();  
    fecharModalPagamento();  
    limparCarrinho();  
    atualizarDashboard();  
    atualizarInterfaceCaixa();  
  
    gerarReciboModalVenda(novaVenda);  
}
function gerarReciboModalVenda(venda) {  
let bodyHtml = `  <p><strong>Data:</strong> ${venda.horario}</p>   <p><strong>Vendedor(a):</strong> ${venda.vendedor}</p>   <p><strong>Cliente:</strong> ${venda.cliente}</p>   <p><strong>CPF:</strong> ${venda.cpf}</p>   <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">   <table style="width:100%; font-size: 0.8rem;">   <tr><th>Qtd Item</th><th>Preço</th></tr>   ${venda.itens.map(i =>`<tr><td>${i.qtd}x ${i.nome}</td><td>R$ ${(i.qtd * i.preco).toFixed(2)}</td></tr>`).join('')}   </table>   <hr style="border: dashed 1px #cbd5e1; margin: 8px 0;">   <p><strong>Pagamento:</strong> ${venda.pagamento.toUpperCase()}</p>   <p><strong>VALOR TOTAL: R$ ${venda.total.toFixed(2)}</strong></p>   <p class="text-center" style="margin-top:10px;"><small>Resp. Técnico: ${dadosEmpresa.crf}</small></p>   `;  
document.getElementById('rec-titulo-documento').innerText = "CUPOM NÃO FISCAL - PDV";  
document.getElementById('receipt-body').innerHTML = bodyHtml;  
document.getElementById('receipt-modal').style.display = 'flex';  
}
function fecharModalRecibo() { document.getElementById('receipt-modal').style.display = 'none'; }
function renderizarRelatorios() {  
let vendasValidas = vendasRealizadas.filter(v => !v.cancelada);  
let faturamento = vendasValidas.reduce((acc, v) => acc + v.total, 0);  
let lucro = faturamento * 0.40;  
let ticketMedio = vendasValidas.length > 0 ? faturamento / vendasValidas.length : 0;
    document.getElementById('rel-faturamento').innerText = `R$ ${faturamento.toFixed(2)}`;  
    document.getElementById('rel-lucro').innerText = `R$ ${lucro.toFixed(2)}`;  
    document.getElementById('rel-ticket-medio').innerText = `R$ ${ticketMedio.toFixed(2)}`;  
  
    let metodos = {};  
    vendasValidas.forEach(v => {  
        metodos[v.pagamento] = (metodos[v.pagamento] || 0) + v.total;  
    });  
  
    let container = document.getElementById('relatorio-metodos-list');  
    if(Object.keys(metodos).length === 0) {  
        container.innerHTML = `<p class="text-muted">Nenhuma venda contabilizada.</p>`;  
    } else {  
        container.innerHTML = Object.keys(metodos).map(m => `  
            <div class="summary-row" style="padding: 8px 0; border-bottom: 1px solid #cbd5e1;">  
                <span>Forma: <strong>${m.toUpperCase()}</strong></span>  
                <span>R$ ${metodos[m].toFixed(2)}</span>  
            </div>  
        `).join('');  
    }  
}
function renderizarHistoricoVendas() {  
let tbody = document.getElementById('sales-history-body');  
if(vendasRealizadas.length === 0) {  
tbody.innerHTML = `<tr><td colspan="8" class="text-center">Nenhuma venda registrada.</td></tr>`;  
return;  
}  
tbody.innerHTML = vendasRealizadas.map(v => `  <tr style="${v.cancelada ? 'text-decoration: line-through; opacity: 0.6;' : ''}">   <td>#${v.id}</td>   <td>${v.horario}</td>   <td>${v.vendedor}</td>   <td>${v.cliente}</td>   <td>${v.cpf}</td>   <td><span class="badge ${v.cancelada ? 'vermelho' : 'livre'}">${v.cancelada ? 'CANCELADA' : v.pagamento.toUpperCase()}</span></td>   <td><strong>R$ ${v.total.toFixed(2)}</strong></td>   <td>   <button class="btn btn-outline" style="padding:4px 8px;" onclick="reimprimirVenda(${v.id})"><i class="fa-solid fa-print"></i></button>   ${!v.cancelada ?`<button class="btn btn-outline" style="padding:4px 8px; color:var(--danger); border-color:var(--danger);" onclick="cancelarVenda(${v.id})" title="Cancelar Venda"><i class="fa-solid fa-ban"></button>`: ''}   </td>   </tr>  `).join('');  
}
function cancelarVenda(id) {  
solicitarAutorizacaoGerente("O cancelamento de venda estorna o estoque e exige senha autorizada.", () => {  
let v = vendasRealizadas.find(item => item.id === id);  
if(v && !v.cancelada) {  
v.cancelada = true;  
v.itens.forEach(itemVendido => {  
let p = produtos.find(prod => prod.id === itemVendido.id);  
if(p) {  
p.estoque += itemVendido.qtd;  
}  
});  
salvarTudoStorage();  
renderizarHistoricoVendas();  
renderizarEstoque();  
atualizarDashboard();  
alert(`Venda #${v.id} cancelada e estoque estornado com sucesso!`);  
}  
});  
}
function reimprimirVenda(id) {  
let v = vendasRealizadas.find(item => item.id === id);  
if(v) gerarReciboModalVenda(v);  
}
function renderizarEstoque() {  
let tbody = document.getElementById('stock-table-body');  
let filtro = document.getElementById('stock-search').value.toLowerCase();  
let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(filtro) || p.categoria.toLowerCase().includes(filtro) || p.lote.toLowerCase().includes(filtro));
    tbody.innerHTML = filtrados.map(p => `  
        <tr>  
            <td>  
                <img src="${p.imagem || 'https://cdn-icons-png.flaticon.com/512/884/884488.png'}" alt="" style="width:40px; height:40px; object-fit:contain; background:var(--light); border-radius:6px; cursor:pointer;" onclick="editarProduto(${p.id})" title="Clique para editar a foto">  
            </td>  
            <td>${p.ean}</td>  
            <td><strong>${p.nome}</strong></td>  
            <td>${p.categoria}</td>  
            <td><span class="badge ${p.tarja.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}">${p.tarja}</span></td>  
            <td>${p.lote}</td>  
            <td>${p.validade ? p.validade.split('-').reverse().join('/') : ''}</td>  
            <td>R$ ${p.preco.toFixed(2)}</td>  
            <td><span style="color: ${p.estoque < 10 ? 'red' : 'inherit'}; font-weight: ${p.estoque < 10 ? 'bold' : 'normal'}">${p.estoque} un.</span></td>  
            <td>  
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editarProduto(${p.id})" title="Editar Produto, Foto e Estoque"><i class="fa-solid fa-pen-to-square"></i></button>  
                <button class="btn btn-outline" style="padding:4px 8px; color:var(--danger); border-color:var(--danger); margin-left: 4px;" onclick="excluirProduto(${p.id})" title="Excluir"><i class="fa-solid fa-trash"></i></button>  
            </td>  
        </tr>  
    `).join('');  
}
function renderizarCurvaABC() {  
let tbody = document.getElementById('abc-table-body');  
let ordenados = [...produtos].sort((a,b) => (b.preco * b.estoque) - (a.preco * a.estoque));
    tbody.innerHTML = ordenados.map((p, index) => {  
        let classificacao = index < 2 ? '<span class="badge verde">CURVA A (Alto Impacto)</span>' : (index < 5 ? '<span class="badge vermelha">CURVA B (Médio Giro)</span>' : '<span class="badge preta">CURVA C (Baixo Giro)</span>');  
        let totalVal = p.preco * p.estoque;  
        return `  
            <tr>  
                <td>${classificacao}</td>  
                <td><strong>${p.nome}</strong></td>  
                <td>${p.estoque} un.</td>  
                <td>R$ ${p.preco.toFixed(2)}</td>  
                <td>R$ ${totalVal.toFixed(2)}</td>  
            </tr>  
        `;  
    }).join('');  
}
function abrirModalNovoProduto() {  
document.getElementById('prod-edit-id').value = '';  
document.getElementById('new-name').value = '';  
document.getElementById('new-cat').value = '';  
document.getElementById('new-tarja').value = 'Livre';  
document.getElementById('new-imagem').value = '';  
document.getElementById('new-lote').value = '';  
document.getElementById('new-validade').value = '';  
document.getElementById('new-price').value = '';  
document.getElementById('new-stock').value = '';  
document.getElementById('product-modal-title').innerHTML = `<i class="fa-solid fa-pills"></i> Cadastrar Novo Medicamento`;  
document.getElementById('product-modal').style.display = 'flex';  
}
function editarProduto(id) {  
let p = produtos.find(item => item.id === id);  
if(p) {  
document.getElementById('prod-edit-id').value = p.id;  
document.getElementById('new-name').value = p.nome;  
document.getElementById('new-cat').value = p.categoria;  
document.getElementById('new-tarja').value = p.tarja;  
document.getElementById('new-imagem').value = p.imagem || '';  
document.getElementById('new-lote').value = p.lote;  
document.getElementById('new-validade').value = p.validade;  
document.getElementById('new-price').value = p.preco;  
document.getElementById('new-stock').value = p.estoque;  
document.getElementById('product-modal-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Editar Medicamento, Foto & Estoque`;  
document.getElementById('product-modal').style.display = 'flex';  
}  
}
function fecharModalNovoProduto() { document.getElementById('product-modal').style.display = 'none'; }
function salvarNovoProduto(e) {  
e.preventDefault();  
solicitarAutorizacaoGerente("Alterar foto, dados ou estoque do medicamento exige senha gerencial.", () => {  
let editId = document.getElementById('prod-edit-id').value;  
let nome = document.getElementById('new-name').value;  
let categoria = document.getElementById('new-cat').value;  
let tarja = document.getElementById('new-tarja').value;  
let imagem = document.getElementById('new-imagem').value || "https://cdn-icons-png.flaticon.com/512/884/884488.png";  
let lote = document.getElementById('new-lote').value;  
let validade = document.getElementById('new-validade').value;  
let preco = parseFloat(document.getElementById('new-price').value);  
let estoque = parseInt(document.getElementById('new-stock').value);
        if(editId !== "") {  
            let p = produtos.find(item => item.id == editId);  
            if(p) {  
                p.nome = nome;  
                p.categoria = categoria;  
                p.tarja = tarja;  
                p.imagem = imagem;  
                p.lote = lote;  
                p.validade = validade;  
                p.preco = preco;  
                p.estoque = estoque;  
            }  
        } else {  
            let novoProd = {  
                id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,  
                ean: "789" + Math.floor(100000000 + Math.random() * 900000000),  
                nome,  
                categoria,  
                tarja,  
                imagem,  
                lote,  
                validade,  
                preco,  
                estoque  
            };  
            produtos.push(novoProd);  
        }  
  
        salvarTudoStorage();  
        fecharModalNovoProduto();  
        renderizarEstoque();  
        renderizarProdutosPDV();  
        atualizarDashboard();  
        alert('Foto e dados do produto atualizados com sucesso!');  
    });  
}
function excluirProduto(id) {  
solicitarAutorizacaoGerente("Remover medicamento do estoque exige senha de autorização.", () => {  
produtos = produtos.filter(p => p.id !== id);  
salvarTudoStorage();  
renderizarEstoque();  
atualizarDashboard();  
});  
}
function abrirModalOrcamento() {  
let container = document.getElementById('budget-product-list');  
container.innerHTML = produtos.map(p => `  <div class="checkbox-item">   <input type="checkbox" value="${p.id}" id="bud-prod-${p.id}" data-price="${p.preco}" data-name="${p.nome}">   <label for="bud-prod-${p.id}">${p.nome} - R$ ${p.preco.toFixed(2)} (Est: ${p.estoque})</label>   </div>  `).join('');  
document.getElementById('budget-modal').style.display = 'flex';  
}
function fecharModalOrcamento() { document.getElementById('budget-modal').style.display = 'none'; }
function enviarOrcamentoWhatsApp() {  
let nomeCliente = document.getElementById('orc-cliente').value || 'Cliente';  
let fone = document.getElementById('orc-fone').value;  
if(!fone) {  
alert('Informe o WhatsApp.');  
return;  
}
    let checkboxes = document.querySelectorAll('#budget-product-list input[type="checkbox"]:checked');  
    if(checkboxes.length === 0) {  
        alert('Selecione pelo menos um produto.');  
        return;  
    }  
  
    let itensOrcamento = [];  
    let totalOrcamento = 0;  
    checkboxes.forEach(cb => {  
        let nome = cb.getAttribute('data-name');  
        let preco = parseFloat(cb.getAttribute('data-price'));  
        itensOrcamento.push(`- ${nome}: R$ ${preco.toFixed(2)}`);  
        totalOrcamento += preco;  
    });  
  
    let mensagem = `Olá *${nomeCliente}*, orçamento solicitado na *${dadosEmpresa.nome}*:%0D%0A%0D%0A` +  
                   itensOrcamento.join('%0D%0A') +   
                   `%0D%0A%0D%0A*Total: R$ ${totalOrcamento.toFixed(2)}*%0D%0AValidade: 24h.`;  
  
    window.open(`https://wa.me/${fone}?text=${mensagem}`, '_blank');  
    fecharModalOrcamento();  
}
function renderizarAvaliacoes() {  
let container = document.getElementById('reviews-container');  
if(avaliacoes.length === 0) {  
container.innerHTML = `<p class="text-muted">Nenhuma avaliação cadastrada.</p>`;  
return;  
}  
container.innerHTML = avaliacoes.map(a => `  <div class="review-item">   <div class="review-header">   <span>${a.nome}</span>   <span>${'⭐'.repeat(a.nota)}</span>   </div>   <p>${a.comentario}</p>   </div>  `).join('');  
}
function enviarAvaliacao(e) {  
e.preventDefault();  
let novaAval = {  
nome: document.getElementById('client-name').value,  
nota: parseInt(document.getElementById('client-rating').value),  
comentario: document.getElementById('client-comment').value  
};  
avaliacoes.push(novaAval);  
salvarTudoStorage();  
document.getElementById('rating-form').reset();  
renderizarAvaliacoes();  
atualizarDashboard();  
alert('Avaliação salva com sucesso!');  
}