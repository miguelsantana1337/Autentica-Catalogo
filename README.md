# Site Autêntica Professional

Site institucional estático da Autêntica Professional, preparado para posicionamento de marca, geração de demanda, SEO técnico e descoberta por mecanismos de busca e sistemas de IA.

## Páginas principais

- `/`: site institucional.
- `/catalogo.html`: catálogo interativo com busca, filtros, pedido e WhatsApp.
- `/links.html`: árvore de links para a bio do Instagram.
- `/produtos/{slug}/`: 34 páginas indexáveis de produto.
- `/guias/`: conteúdos editoriais sobre cuidado capilar.
- `/obrigado/`: confirmação do formulário comercial.

## SEO e descoberta

- HTML semântico e conteúdo principal renderizado no documento.
- Metadados, URLs canônicas, Open Graph e Twitter Card.
- Dados estruturados de organização, site, FAQ, artigos, produtos e breadcrumbs.
- `sitemap.xml`, `robots.txt`, `llms.txt` e `produtos.json`.
- Links internos entre homepage, catálogo, guias e produtos.
- Páginas editoriais para buscas conversacionais.

## Formulário comercial

O formulário usa Netlify Forms com o nome `contato-comercial` e redireciona para `/obrigado/`.

Depois da publicação, habilite a detecção de formulários no Netlify e configure a notificação em **Project configuration > Notifications**.

## Pedido pelo WhatsApp

- Quantidade configurável em cada produto.
- Pedido persistido no navegador.
- Pré-qualificação com nome, perfil, salão/negócio, cidade, CEP, endereço, CNPJ opcional e observações.
- Mensagem pronta para `+55 31 98567-4049`, com produtos e quantidades.
- Nenhum preço B2B ou B2C é exposto publicamente.
- Resultados do teste operacional em `TESTE-DE-ESTRESSE.md`.

## Árvore de links

`links.html` possui quatro caminhos:

- WhatsApp B2B para profissionais e salões.
- WhatsApp B2C para uso pessoal.
- Catálogo interativo com parâmetros UTM.
- Site institucional com parâmetros UTM.

O SLA e o padrão operacional estão em `OPERACAO-WHATSAPP.md`.

## Gerar páginas de produto

As páginas usam os dados de `app.js`. Depois de alterar o portfólio, execute:

```bash
SITE_URL=https://seu-dominio.com node scripts/generate-product-pages.mjs
```

O script recria as 34 páginas, `produtos.json` e `sitemap.xml`. Neste ambiente, pode ser necessário usar o caminho completo do Node fornecido pelo Codex.

## Domínio

As URLs canônicas atuais usam `https://autentica-professional-catalogo.netlify.app`. Troque esse endereço pelo domínio institucional definitivo antes de enviar o sitemap ao Google Search Console.

## Desenvolvimento local

O projeto não exige instalação ou build. Sirva a raiz com qualquer servidor HTTP estático:

```bash
python3 -m http.server 4173
```

Acesse `http://127.0.0.1:4173/`.
