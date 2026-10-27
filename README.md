# Elevatta · Planejamento de obras

Aplicação estática em português para obras, planejamento semanal, equipes, avanços, reprogramações e relatórios. Versão 2026.10.27.1, derivada do pacote mobile-fix.

## Uso

- **Painel semanal:** visão por obra, indicadores, atenção a responsáveis/prazos/impedimentos, cartões detalhados ou compactos.
- **Minhas obras:** cadastrar obras manualmente ou importar a planilha de metas (.xlsx).
- **Nova atividade:** incluir serviços, local e datas. O período pode começar em qualquer dia da semana.
- **Editar serviço e datas:** mantém os responsáveis, avanços e identificação da atividade. Uma reimportação da mesma atividade pode atualizar os campos vindos da planilha.
- **Pessoas e equipes:** criar, editar e pesquisar por nome, função ou equipe.
- **Avanço:** atualizar o percentual de execução e reabrir serviços quando o percentual for reduzido.
- **Cópias e recuperação:** exportar todos os dados ou recuperar o estado anterior ao último salvamento.
- **Compartilhar dados:** usa o compartilhamento do dispositivo, quando suportado; alternativamente baixa o JSON para enviar como documento.
- **Importar dados:** mostra a confirmação antes de substituir o conteúdo deste navegador.
- **Relatórios:** imprimir ou salvar PDF no diálogo de impressão.

## Armazenamento

Os dados ficam no navegador, na chave `obras-semanal-equipes-v2`. Essa chave e o formato `obras-semanal/2` foram preservados. Não há login de usuários ou sincronização entre aparelhos. Faça exportações periódicas. Limpar os dados do navegador também apaga as cópias automáticas.

A cópia automática guarda apenas o estado anterior ao último salvamento. Se outra aba alterar os dados, novos salvamentos são bloqueados até recarregar, evitando sobrescrita silenciosa. Se o armazenamento falhar, exporte as alterações ainda em memória.

## Publicação

Use o serviço **Planejamento_Elevatta** já existente no Render, conectado a `Hanzyel/Planejamento_Elevatta`, branch `main`.

- Build command: `echo "No build required"`
- Publish directory: `.`
- Root directory: vazio
- Redirects/Rewrites: `/*` → `/index.html`, ação **Rewrite**
- Headers: `/*`, `Cache-Control`, `no-cache`

O `render.yaml` registra a configuração, mas não altera automaticamente um serviço criado manualmente. Confira as regras no painel desse serviço. Não crie um segundo serviço para aplicar o arquivo.

## Celular e offline

Abra a raiz do domínio HTTPS. O aplicativo guarda seus arquivos para uso offline após a primeira carga completa. Ícones de 192 e 512 pixels e caminhos absolutos estão incluídos. Uma atualização disponível aparece no topo, sem recarregar formulários abertos. Instalação e compartilhamento dependem do navegador. Se um atalho antigo continuar inválido, remova somente o atalho e abra a raiz novamente; exporte seus dados antes de limpar qualquer armazenamento.

## Desenvolvimento

Não há compilação ou dependências remotas de execução. Sirva esta pasta com um servidor HTTP local; caminhos absolutos e service worker não funcionam abrindo o HTML diretamente ou em um subdiretório do GitHub Pages.

`index.html`: estrutura; `base.css` e `interface.css`: estilos; `seed.js`: planejamento inicial do pacote fornecido; `app.js`: funcionalidades; `jszip.min.js`: JSZip 3.10.1 com licença incorporada; `pwa.js` e `sw.js`: instalação, atualização e offline.
