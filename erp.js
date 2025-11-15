// Elementos HTML referenciados no JavaScript
const nomeInput = document.getElementById("nomeMaterial");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnDeletarTudo = document.getElementById("btnDeletarTudo");
const mensagem = document.getElementById("mensagem");
const listaUl = document.getElementById("listaMateriais");

// Array que armazena todos os materiais
let materiais = [];

// Normaliza whitespace, NBSP e trim em strings
function normalizarNome(texto) {
  return String(texto)
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Exibe mensagens de feedback com tipo (sucesso, erro, info)
function exibirMensagem(texto, tipo = "info") {
  const cores = {
    sucesso: "#155a96",
    erro: "var(--danger)",
    info: "var(--muted)",
  };
  mensagem.style.color = cores[tipo] || cores.info;
  mensagem.textContent = texto;
}

// Cria um item de lista com nome e botões de ação
function criarItemLista(nome, index) {
  const li = document.createElement("li");
  li.className = "item";

  const nomeSpan = document.createElement("span");
  nomeSpan.className = "nome";
  nomeSpan.textContent = nome;

  const acoes = document.createElement("div");
  acoes.className = "acoes";

  // Botão Editar
  const btnEdit = document.createElement("button");
  btnEdit.className = "icon-btn edit";
  btnEdit.textContent = "Editar";
  btnEdit.addEventListener("click", () => editarMaterial(index));

  // Botão Deletar
  const btnDelete = document.createElement("button");
  btnDelete.className = "icon-btn delete";
  btnDelete.textContent = "Deletar";
  btnDelete.addEventListener("click", () => deletarMaterial(index));

  acoes.appendChild(btnEdit);
  acoes.appendChild(btnDelete);

  li.appendChild(nomeSpan);
  li.appendChild(acoes);

  return li;
}

// Renderiza a lista de materiais na tela
function renderizarLista() {
  listaUl.innerHTML = "";

  // Se vazio, mostra mensagem padrão
  if (materiais.length === 0) {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML =
      '<span class="nome" style="color:var(--muted)">Nenhum material cadastrado. Use o campo acima para adicionar!</span>';
    listaUl.appendChild(li);
    return;
  }

  // Cria um item <li> para cada material no array
  materiais.forEach((mat, index) => {
    listaUl.appendChild(criarItemLista(mat, index));
  });
}

// Adiciona novo material ao array e renderiza
function adicionarMaterial() {
  const nome = normalizarNome(nomeInput.value);

  // Validação: campo não pode estar vazio
  if (!nome) {
    exibirMensagem("Digite o nome do material antes de adicionar.", "erro");
    return;
  }

  materiais.push(nome);
  nomeInput.value = "";
  exibirMensagem("Material inserido com sucesso!", "sucesso");
  renderizarLista();
}

// Remove um material do array por índice
function deletarMaterial(index) {
  // Confirmação para evitar exclusão acidental
  if (!confirm(`Confirma remover o material \"${materiais[index]}\" ?`)) return;

  materiais.splice(index, 1);
  exibirMensagem("Material removido.", "info");
  renderizarLista();
}

// Edita um material existente usando prompt
function editarMaterial(index) {
  let atual = materiais[index];
  let novo = prompt("Edite o nome do material", atual);

  // Cancela se usuário clicar em cancelar
  if (novo === null) return;

  // Normaliza espaços do novo valor antes de validar
  const value = normalizarNome(novo);

  // Valida o novo nome
  if (!value) {
    exibirMensagem("Digite um nome válido para o material.", "erro");
    return;
  }

  materiais[index] = value;
  exibirMensagem("Material atualizado com sucesso!", "sucesso");
  renderizarLista();
}

// Deleta todos os materiais do catálogo
function deletarCatalogo() {
  // Se já está vazio, não faz nada
  if (materiais.length === 0) {
    exibirMensagem("O catálogo já está vazio.", "info");
    return;
  }

  // Confirmação dupla para ação destrutiva
  if (
    !confirm(
      "Tem certeza que deseja deletar todo o catálogo? Esta ação não pode ser desfeita."
    )
  )
    return;

  materiais = [];
  exibirMensagem("Catálogo deletado.", "erro");
  renderizarLista();
}

// Event listeners - Vincula eventos aos botões
btnAdicionar.addEventListener("click", adicionarMaterial);
btnDeletarTudo.addEventListener("click", deletarCatalogo);

// Permite adicionar material ao pressionar Enter
nomeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    adicionarMaterial();
  }
});

// Limpa o campo se o usuário digitar apenas espaços e colapsa múltiplos espaços
nomeInput.addEventListener("input", (e) => {
  const el = e.target;
  // substitui NBSP por espaço
  let v = el.value.replace(/\u00A0/g, " ");
  // se, após trim, estiver vazio => limpa o campo
  if (v.trim() === "") {
    el.value = "";
    return;
  }
  // colapsa sequências de whitespace em um único espaço
  el.value = v.replace(/\s+/g, " ");
});
