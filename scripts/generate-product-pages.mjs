import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = (process.env.SITE_URL || "https://autentica-professional-catalogo.netlify.app").replace(/\/$/, "");
const source = fs.readFileSync(path.join(root, "app.js"), "utf8");
const match = source.match(/const products = (\[[\s\S]*?\n\]);/);

if (!match) throw new Error("Não foi possível localizar a lista de produtos em app.js.");

const products = vm.runInNewContext(match[1]);
const painLabels = {
  volume: "Transformação e alinhamento",
  recovery: "Recuperação e cronograma",
  blond: "Loiros e descoloração",
  scalp: "Terapia capilar e cachos",
  finish: "Finalização e proteção",
  lavatory: "Performance no lavatório",
};
const audienceLabels = { b2b: "Uso profissional", b2c: "Cuidado em casa", revenda: "Revenda" };

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function absoluteImage(image) {
  return `${siteUrl}/${image}`;
}

function productSchema(product) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${siteUrl}/produtos/${product.slug}/#product`,
          name: product.name,
          image: [absoluteImage(product.image)],
          description: product.description,
          category: `${painLabels[product.pain]} / ${product.category}`,
          brand: { "@type": "Brand", name: "Autêntica Professional" },
          audience: product.audiences.map((audience) => ({
            "@type": "Audience",
            audienceType: audienceLabels[audience],
          })),
          additionalProperty: [
            { "@type": "PropertyValue", name: "Ativos", value: product.actives },
            { "@type": "PropertyValue", name: "Indicação", value: product.indication },
            { "@type": "PropertyValue", name: "Resultado esperado", value: product.result },
          ],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Catálogo", item: `${siteUrl}/catalogo.html` },
            { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/produtos/${product.slug}/` },
          ],
        },
      ],
    },
    null,
    2
  ).replaceAll("</", "<\\/");
}

function renderRelated(product) {
  return products
    .filter((candidate) => candidate.pain === product.pain && candidate.slug !== product.slug)
    .slice(0, 3)
    .map(
      (candidate) => `
        <a class="related-card" href="../${candidate.slug}/">
          <img src="../../${escapeHtml(candidate.image)}" alt="${escapeHtml(candidate.name)} Autêntica Professional" loading="lazy">
          <span>${escapeHtml(candidate.category)}</span>
          <strong>${escapeHtml(candidate.name)}</strong>
        </a>`
    )
    .join("");
}

function renderProductPage(product) {
  const canonical = `${siteUrl}/produtos/${product.slug}/`;
  const audience = product.audiences.map((item) => audienceLabels[item]).join(" · ");
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(product.name)} | Autêntica Professional</title>
    <meta name="description" content="${escapeHtml(`${product.name}: ${product.tagline} Indicado para ${product.indication.toLowerCase()}`)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#f4efe8">
    <link rel="canonical" href="${canonical}">
    <link rel="icon" href="../../assets/logo-autentica-original.webp" type="image/webp">
    <link rel="stylesheet" href="../../home.css">
    <link rel="stylesheet" href="../../product-page.css">
    <meta property="og:type" content="product">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Autêntica Professional">
    <meta property="og:title" content="${escapeHtml(product.name)} | Autêntica Professional">
    <meta property="og:description" content="${escapeHtml(product.tagline)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${absoluteImage(product.image)}">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${productSchema(product)}</script>
  </head>
  <body class="product-page">
    <a class="skip-link" href="#produto">Pular para o produto</a>
    <header class="product-header">
      <a class="site-brand" href="../../" aria-label="Autêntica Professional, página inicial">
        <span class="brand-symbol" aria-hidden="true"></span>
        <span class="brand-name">Autêntica <small>Professional</small></span>
      </a>
      <nav aria-label="Navegação"><a href="../../#solucoes">Soluções</a><a href="../../catalogo.html">Catálogo</a><a class="product-nav-cta" href="../../#contato">Contato comercial</a></nav>
    </header>

    <main id="produto">
      <nav class="breadcrumbs section-shell" aria-label="Trilha de navegação">
        <a href="../../">Início</a><span>/</span><a href="../../catalogo.html">Catálogo</a><span>/</span><span>${escapeHtml(product.name)}</span>
      </nav>

      <section class="product-hero section-shell">
        <div class="product-photo ${product.photo ? "is-photo" : "is-cutout"}">
          <img src="../../${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} Autêntica Professional" width="900" height="900">
        </div>
        <div class="product-intro">
          <p class="eyebrow">${escapeHtml(painLabels[product.pain])}</p>
          <h1>${escapeHtml(product.name)}</h1>
          <p class="product-tagline">${escapeHtml(product.tagline)}</p>
          <div class="product-audience">${product.audiences.map((item) => `<span>${escapeHtml(audienceLabels[item])}</span>`).join("")}</div>
          <p class="product-description">${escapeHtml(product.description)}</p>
          <div class="product-actions">
            <a class="button button-primary" href="../../catalogo.html?produto=${product.slug}">Comprar pelo WhatsApp</a>
            <a class="text-link" href="../../catalogo.html?linha=${product.pain}">Ver linha completa <span>↗</span></a>
          </div>
        </div>
      </section>

      <section class="product-details">
        <div class="section-shell product-details-grid">
          <div><span>01</span><h2>Ativos e tecnologia</h2><p>${escapeHtml(product.actives)}</p></div>
          <div><span>02</span><h2>Para quem é indicado</h2><p>${escapeHtml(product.indication)}</p></div>
          <div><span>03</span><h2>Resultado esperado</h2><p>${escapeHtml(product.result)}</p></div>
        </div>
      </section>

      <section class="product-guidance section-shell">
        <div><p class="eyebrow">Escolha consciente</p><h2>O produto certo começa com um bom diagnóstico.</h2></div>
        <div>
          <p>A resposta do cabelo varia conforme histórico químico, estado da fibra, rotina e técnica de aplicação. Observe sempre a indicação do rótulo e, em procedimentos químicos ou produtos de uso profissional, conte com avaliação especializada.</p>
          <p><strong>Perfil de uso:</strong> ${escapeHtml(audience)}.</p>
        </div>
      </section>

      <section class="related section-shell">
        <div class="related-heading"><p class="eyebrow">Continue explorando</p><h2>Outras soluções para ${escapeHtml(painLabels[product.pain].toLowerCase())}</h2></div>
        <div class="related-grid">${renderRelated(product)}</div>
      </section>
    </main>

    <footer class="product-footer"><div class="section-shell"><span>Autêntica Professional</span><a href="../../catalogo.html">Explorar catálogo</a><a href="https://www.instagram.com/autenticaprofessional/" target="_blank" rel="noreferrer">Instagram ↗</a></div></footer>
  </body>
</html>`;
}

for (const product of products) {
  const directory = path.join(root, "produtos", product.slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), renderProductPage(product));
}

fs.writeFileSync(
  path.join(root, "produtos.json"),
  JSON.stringify(
    products.map((product) => ({
      ...product,
      url: `${siteUrl}/produtos/${product.slug}/`,
      image: absoluteImage(product.image),
    })),
    null,
    2
  )
);

const staticUrls = [
  "",
  "catalogo.html",
  "links.html",
  "guias/cronograma-capilar/",
  "guias/cabelos-pos-quimica/",
  "guias/como-escolher-tratamento-capilar/",
];
const urls = [...staticUrls, ...products.map((product) => `produtos/${product.slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${siteUrl}/${url}</loc><lastmod>2026-06-11</lastmod></url>`).join("\n")}
</urlset>\n`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

console.log(`Geradas ${products.length} páginas de produto, produtos.json e sitemap.xml.`);
