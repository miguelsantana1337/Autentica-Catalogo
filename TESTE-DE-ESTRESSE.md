# Teste de estresse operacional

Executado em 11 de junho de 2026.

## 1. Latencia e peso mobile

- Imagens usadas nas telas convertidas para WebP.
- Fotos do Drive recomprimidas e limitadas a 1200 px.
- Imagens fora da primeira tela carregadas por `IntersectionObserver`.
- Previsualizacoes do PDF reduzidas de JPG para WebP.
- O PDF de 6,3 MB permanece disponivel somente por clique e nao entra no carregamento inicial.
- Teste local simulado em Fast 3G, CPU 4x e viewport 390 x 844: 1,76 segundo ate `load`, 288 KB transferidos e 6 recursos iniciais.

## 2. Friccao no CTA

- Todo botao `Comprar` adiciona o produto ao pedido e abre a qualificacao.
- Paginas individuais enviam o produto escolhido para o mesmo fluxo.
- A mensagem do WhatsApp inclui produto, quantidade e dados do cliente.
- Exemplo validado: `2x Terra Acai` para `wa.me/5531985674049`.

## 3. Navegacao

- Filtros por dor permanecem fixos durante a rolagem.
- Rotas principais: Reducao de volume, Cronograma capilar, Loiros/descoloracao, Terapia capilar, Finalizadores e Uso profissional.
- Busca e filtro por perfil continuam disponiveis.

## 4. Precificacao

- O catalogo nao exibe precos de atacado nem de varejo.
- Condicoes B2B sao solicitadas de forma privada pelo WhatsApp.

## Validacao responsiva

- Chrome headless em 390 x 844.
- Sem overflow horizontal.
- Card, stepper de quantidade, botoes e formulario sem sobreposicao.
