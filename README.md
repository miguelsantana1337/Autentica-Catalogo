# Catálogo Interativo Autêntica Professional

Site estático do catálogo interativo da Autêntica Professional.

## Site publicado

[autentica-professional-catalogo.netlify.app](https://autentica-professional-catalogo.netlify.app)

## Recursos

- 27 produtos organizados pela dor do cabelo ou etapa do serviço.
- Busca por produto, ativo, indicação ou resultado.
- Filtros por perfil: salão, cliente e revenda.
- Páginas detalhadas em modal com ativos, indicação e resultado.
- Lista de interesse persistente no navegador.
- Solicitação individual ou em grupo pelo WhatsApp.
- Layout responsivo para desktop e celular.
- Logo original e imagens extraídas do catálogo oficial.
- Fotografias profissionais fornecidas na pasta compartilhada do Google Drive.

## Como abrir

Abra `index.html` diretamente no navegador.

O projeto não exige instalação, build ou dependências locais.

## WhatsApp

O número temporário configurado é `+55 31 98567-4049`. Para trocar depois, edite a primeira linha de `app.js`:

```js
const WHATSAPP_NUMBER = "+55 31 98567-4049";
```

Se o número ficar vazio, os botões usam `https://wa.me/?text=...` com a mensagem do produto preenchida.

## Arquivos

- `index.html`: estrutura da interface.
- `styles.css`: visual responsivo.
- `app.js`: base de produtos, filtros, modal e lista de interesse.
- `assets/products`: imagens extraídas do PDF.
- `assets/drive-products`: fotografias do Google Drive otimizadas em WebP.
- `assets/drive-products/source-map.json`: relação entre cada produto e o arquivo original do Drive.
- `assets/catalogo`: PDF original e páginas renderizadas para consulta.
- `netlify.toml`: publicação estática, cache e cabeçalhos de segurança.

## Publicação

O site está configurado para publicação estática no Netlify usando a raiz do repositório como diretório público.
