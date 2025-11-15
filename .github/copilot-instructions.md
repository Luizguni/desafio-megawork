<!-- Instruções para agentes AI / Copilot - geradas automaticamente -->


# Este repositório é uma pequena aplicação cliente (HTML/CSS/JS) que implementa um catálogo de materiais.
As instruções abaixo ajudam onde olhar, quais convenções seguir, e como testar mudanças localmente.

**Visão Geral (big picture)**
- **Arquivos principais**: `erpMaterias.html` (view), `erp.js` (comportamento), `erp.css` (estilos e design tokens).
- **Arquitetura**: aplicação estática de frontend — sem backend, sem build system. O estado está em memória (variável `materiais` em `erp.js`).
- **Fluxo de dados**: usuário → `input#nomeMaterial` → `adicionarMaterial()` atualiza `materiais` → `renderizarLista()` reconstrói `ul#listaMateriais`.

**Padrões e convenções do projeto**
- Vanilla JavaScript (ES6), sem frameworks. Evite introduzir bundlers a menos que justificado.
- Manipulação direta do DOM por `getElementById` e criação de elementos via `document.createElement`.
- Normalização de entradas: função `normalizarNome(texto)` (substitui NBSP, colapsa espaços e faz `trim`) — preserve esse comportamento ao alterar validação.
- Feedback ao usuário é exibido em `#mensagem` (atributo `aria-live="polite"` no HTML). Use `exibirMensagem(texto, tipo)` para manter consistência visual/semântica.
- Acessibilidade: o HTML já usa `label`, `aria-label` e `aria-live`. Preserve ou estenda essas práticas ao adicionar elementos interativos.

**Funções-chave (exemplos do código)**
- `adicionarMaterial()` — valida `nome` via `normalizarNome`, atualiza `materiais`, limpa o campo e chama `renderizarLista()`.
- `renderizarLista()` — recria o conteúdo de `ul#listaMateriais`; quando vazio, exibe mensagem padrão.
- `editarMaterial(index)` — usa `prompt()` para editar; valida com `normalizarNome` e atualiza `materiais[index]`.
- `deletarMaterial(index)` e `deletarCatalogo()` — usam `confirm()`; atenção à confirmação dupla em `deletarCatalogo()`.

**Estilos / Design**
- `erp.css` define variáveis CSS (design tokens) em `:root` (ex.: `--sap-blue`, `--radius`). Reutilize essas variáveis quando adicionar novas classes.
- Layout responsivo simples com media query `@media (max-width: 660px)` — mantenha a mesma abordagem (flex, gap) para consistência.

**Como rodar e depurar localmente (developer workflow)**
- Não há build; abra `erpMaterias.html` no navegador para testar rapidamente.
- Para testes mais realistas (evitar problemas de CORS com carregamento local), use um servidor estático. Exemplos:

  - Com `Live Server` (VSCode): Instale a extensão e clique em "Open with Live Server".
  - Com `http-server` (Node): `npm install -g http-server` então na pasta do projeto:

    `http-server . -p 8080`

  Depois abra `http://localhost:8080/erpMaterias.html`.

- Debug: abrir DevTools → `Sources` → colocar breakpoints em `erp.js`, inspecionar `materiais` e eventos. Console logs úteis: `console.log(materiais)`.

**Integrações e pontos de extensão**
- Atualmente não há integração externa (APIs ou armazenamento). Se for necessário persistir, integrate com `localStorage` ou um endpoint REST — observe onde `materiais` é manipulado (`adicionarMaterial`, `deletarMaterial`, `editarMaterial`).
- Evite mudar IDs dos elementos existentes (`nomeMaterial`, `btnAdicionar`, `btnDeletarTudo`, `listaMateriais`, `mensagem`) sem atualizar `erp.js`.
