const WHATSAPP_NUMBER = "+55 31 98567-4049";

const pains = [
  { id: "all", label: "Todos", title: "Catálogo Autêntica Professional", context: "Todos os produtos" },
  { id: "volume", label: "Alisar e reduzir frizz", title: "Transformação e redução de volume", context: "Foco forte B2B" },
  { id: "recovery", label: "Salvar cabelo quebrado", title: "Cronograma e recuperação extrema", context: "Tratamentos B2B e B2C" },
  { id: "blond", label: "Loiros e descoloração", title: "Especial loiros e descoloração", context: "Química pesada e manutenção" },
  { id: "scalp", label: "Crescimento e couro", title: "Terapia capilar e cuidados específicos", context: "Nicho e retenção" },
  { id: "finish", label: "Finalização e revenda", title: "Finalização premium", context: "Upsell de lavatório" },
  { id: "lavatory", label: "Rentabilidade no lavatório", title: "Operação profissional", context: "Exclusivo B2B" },
];

const products = [
  {
    slug: "terra-acai",
    name: "Terra Açaí",
    category: "Transformação",
    pain: "volume",
    audiences: ["b2b"],
    image: "assets/products/terra-acai.png",
    tagline: "Escova orgânica para liso total com saúde e força.",
    actives: "Blend orgânico.",
    indication: "Redução de volume, alinhamento e controle de frizz em serviços de salão.",
    result: "Alisamento total, fios mais fortes e acabamento saudavel.",
    description:
      "Indicada para profissionais que precisam entregar redução de volume com apelo orgânico e resultado visual de alto impacto.",
  },
  {
    slug: "ta-liso",
    name: "Tá Liso",
    category: "Transformação",
    pain: "volume",
    audiences: ["b2b"],
    image: "assets/products/ta-liso.png",
    tagline: "Escova sinérgica com ativação térmica.",
    actives: "Tecnologia termoativada pela prancha.",
    indication: "Alinhamento de cutículas e modelagem da nova forma dos fios.",
    result: "Fios alinhados, disciplinados e com liso potencializado.",
    description:
      "Linha de escova para redução de volume em serviços profissionais, pensada para selar e fixar o formato desejado.",
  },
  {
    slug: "reforce-xtreme-btx",
    name: "Reforce Xtreme BTX",
    category: "Transformação",
    pain: "volume",
    audiences: ["b2b"],
    image: "assets/products/reforce-xtreme-btx.png",
    tagline: "Máscara termoativada para reposição de massa.",
    actives: "Repositor de massa com ação termoativada.",
    indication: "Todos os tipos de cabelo que precisam de selagem e disciplina.",
    result: "Fios lisos, selados e iluminados.",
    description:
      "BTX profissional para entregar efeito de selagem e acabamento polido enquanto ajuda a repor massa na fibra.",
  },
  {
    slug: "extrato-floresta-luxeplastica",
    name: "Extrato Floresta Luxeplástica",
    category: "Transformação",
    pain: "volume",
    audiences: ["b2b"],
    image: "assets/products/extrato-floresta-luxeplastica.png",
    tagline: "Luxeplástica com ativos da Amazônia.",
    actives: "Ativos da Floresta Amazônica e efeito orgânico.",
    indication: "Cauterização com redução de frizz e alinhamento das cutículas.",
    result: "Liso extreme, nutrição no córtex e brilho.",
    description:
      "Tratamento de transformação para profissionais que querem unir cauterização, definição e redução de volume em uma única oferta.",
  },
  {
    slug: "btx-blond",
    name: "BTX Blond",
    category: "Transformação",
    pain: "volume",
    audiences: ["b2b"],
    image: "assets/products/btx-blond.png",
    tagline: "Restaurador capilar com pigmento matizante.",
    actives: "Pigmentos matizantes para proteção da cor.",
    indication: "Cabelos cacheados, crespos ou indisciplinados com necessidade de reduzir volume.",
    result: "Reduz volume e minimiza oxidação da cor.",
    description:
      "Opção de redução de volume para fios com cor, pensada para evitar amarelamento e envelhecimento visual do cabelo.",
  },
  {
    slug: "ouro-argan",
    name: "Ouro Argan",
    category: "Reconstrução",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/ouro-argan.png",
    tagline: "Reconstrução para fibra quebradiça.",
    actives: "Argan e Monoi.",
    indication: "Fios quebradiços, opacos e enfraquecidos.",
    result: "Reparação profunda e recuperação da fibra capilar.",
    description:
      "Linha de cronograma capilar voltada para reconstrução essencial e recuperação de fios fragilizados.",
  },
  {
    slug: "geleia-real",
    name: "Geleia Real",
    category: "Hidratação",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/geleia-real.png",
    tagline: "Hidratação inteligente com alta carga proteica.",
    actives: "Extrato de mel e proteínas.",
    indication: "Fios danificados que precisam repor água e nutrientes.",
    result: "Recupera, fortalece e protege a fibra.",
    description:
      "Tratamento equilibrante para trazer maciez, resistência e resposta mais rápida aos demais ativos do cronograma.",
  },
  {
    slug: "super-nutri",
    name: "Super Nutri",
    category: "Nutrição",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/super-nutri.png",
    tagline: "Fusão de lipídeos para pós-química.",
    actives: "Lipídeos e sistema nutritivo.",
    indication: "Pós-mechas, pós-progressiva e fios ressecados.",
    result: "Regenera o manto hidrolipídico e sela áreas porosas.",
    description:
      "Linha de nutricao para recuperar toque, flexibilidade e brilho em cabelos que passaram por processos quimicos.",
  },
  {
    slug: "morango-champagner",
    name: "Morango & Champagner",
    category: "Reposição de carbono",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/morango-champagner.png",
    tagline: "Reposição de carbono com vitaminas.",
    actives: "Vitaminas e ativos de reposição nutritiva.",
    indication: "Cabelos que precisam melhorar absorção de ativos.",
    result: "Fortalece a ligação entre aminoácidos e melhora reposição de nutrientes.",
    description:
      "Tratamento de alta performance para cronograma capilar, indicado quando a fibra precisa responder melhor aos ativos.",
  },
  {
    slug: "sos",
    name: "S.O.S",
    category: "Hidro nutritivo",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/sos.png",
    tagline: "Linha anti-quebra e anti-pontas duplas.",
    actives: "Sistema hidro nutritivo para aumento de espessura do fio.",
    indication: "Fios descuticulados, quebradiços e com dificuldade de desembaraço.",
    result: "Reduz quebra, melhora desembaraço e encorpa a fibra.",
    description:
      "Tratamento para recuperar o aspecto de fios fragilizados, com foco em resistencia e toque.",
  },
  {
    slug: "desfibrilador",
    name: "Desfibrilador",
    category: "Cauterização",
    pain: "recovery",
    audiences: ["b2b"],
    image: "assets/products/desfibrilador.png",
    tagline: "S.O.S. para emborrachamento e dano severo.",
    actives: "Queratina vegetal, Luna Matrix e ação acidificante.",
    indication: "Pontas danificadas, emborrachamento e fibra desestabilizada.",
    result: "Repõe massa, neutraliza química e reestrutura a fibra.",
    description:
      "Tratamento intenso para bancada profissional, criado para balancear pH e recuperar cabelos em estado critico.",
  },
  {
    slug: "ampolas-3-etapas",
    name: "Ampolas 3 Etapas",
    category: "Cronograma rápido",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/ampolas-3-etapas.png",
    tagline: "Reconstrução, nutrição e hidratação em rotina rápida.",
    actives: "Óleos, lipídeos e ativos nutritivos.",
    indication: "Manutenção acelerada do cronograma capilar.",
    result: "Fortalece, nutre e devolve água para fios saudáveis.",
    description:
      "Kit compacto para transformar diagnostico em rotina simples de tres etapas essenciais.",
  },
  {
    slug: "po-descolorante",
    name: "Pó Descolorante",
    category: "Loiros",
    pain: "blond",
    audiences: ["b2b"],
    image: "assets/products/po-descolorante.png",
    tagline: "Clareamento para mechas, luzes e decapagem.",
    actives: "Sistema de descoloração profissional.",
    indication: "Técnicas de mechas, luzes e decapagens.",
    result: "Loiro luminoso com respeito à integridade dos fios.",
    description:
      "Produto obrigatório para salões que trabalham com transformações em loiros e precisam equilibrar técnica e segurança.",
  },
  {
    slug: "black-platinum",
    name: "Black Platinum",
    category: "Loiros",
    pain: "blond",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/black-platinum.png",
    tagline: "Linha matizadora para efeito platinado.",
    actives: "Pigmentos especiais de alta tecnologia.",
    indication: "Cabelos loiros, descoloridos ou grisalhos.",
    result: "Efeito platinado e cor mais fria.",
    description:
      "Linha de manutencao para neutralizar tons indesejados e entregar um visual platinado em loiros e grisalhos.",
  },
  {
    slug: "silver-blond",
    name: "Silver Blond",
    category: "Loiros",
    pain: "blond",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/silver-blond.png",
    tagline: "Revitalização de loiros e neutralização do amarelado.",
    actives: "Protein Collor, extrato violeta e complexo protetor.",
    indication: "Loiros com tonalidade amarelada.",
    result: "Elimina o amarelado e protege a cor.",
    description:
      "Tratamento de manutenção para tons loiros, com foco em brilho, proteção e efeito frio controlado.",
  },
  {
    slug: "vita-hair",
    name: "Vita Hair Vitamin Complex",
    category: "Terapia capilar",
    pain: "scalp",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/vita-hair.png",
    tagline: "Blend vitamínico para fios enfraquecidos.",
    actives: "Blend de vitaminas.",
    indication: "Fios fracos após dengue, zika, chikungunya, covid-19 ou queda intensa.",
    result: "Estimula crescimento e devolve força e brilho.",
    description:
      "Linha voltada para terapia capilar e retencao de clientes que buscam fortalecer fios fragilizados.",
  },
  {
    slug: "therapy-detox",
    name: "Therapy Detox",
    category: "Terapia capilar",
    pain: "scalp",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/therapy-detox.png",
    tagline: "Shampoo purificante para couro cabeludo equilibrado.",
    actives: "Ingredientes detoxificantes e naturais.",
    indication: "Acúmulo de resíduos, oleosidade e sensação de peso.",
    result: "Remove impurezas, equilibra o couro cabeludo e traz frescor.",
    description:
      "Produto de entrada para protocolos de limpeza profunda, preparando a fibra para melhor resposta aos tratamentos.",
  },
  {
    slug: "coffee",
    name: "Coffee",
    category: "Terapia capilar",
    pain: "scalp",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/coffee.png",
    tagline: "Tratamento com cafeína para crescimento.",
    actives: "Cafeína.",
    indication: "Queda, crescimento lento e folículos enfraquecidos.",
    result: "Estimula circulação no couro cabeludo e fortalece os fios.",
    description:
      "Linha de tratamento para quem precisa de uma narrativa clara de crescimento, força e estimulação capilar.",
  },
  {
    slug: "super-cachos",
    name: "Super Cachos",
    category: "Cachos",
    pain: "scalp",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/super-cachos-black.png",
    tagline: "Definição, memória do cacho e controle de frizz.",
    actives: "Sistema de tratamento para cabelos ondulados, cacheados e crespos.",
    indication: "Todas as curvaturas que precisam de definição e movimento natural.",
    result: "Reativa memória dos cachos, reduz volume e elimina frizz.",
    description:
      "Linha para valorizar curvaturas com brilho, balanco e forma definida sem perder naturalidade.",
  },
  {
    slug: "inspira-parfum",
    name: "Inspira Parfum",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/inspira-parfum.png",
    tagline: "Perfume capilar com blend de nutrientes.",
    actives: "Blend nutritivo e fragrância luxuosa.",
    indication: "Finalização de atendimento e venda por encantamento olfativo.",
    result: "Perfuma, hidrata e dá brilho aos fios.",
    description:
      "Finalizador premium para gerar desejo imediato no lavatório e facilitar a revenda para manutenção em casa.",
  },
  {
    slug: "use-me-parfum",
    name: "Use-Me Parfum",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/use-me-parfum.png",
    tagline: "Fragrância marcante com proteção solar.",
    actives: "Fragrância capilar, proteção solar e anti-frizz.",
    indication: "Fios alinhados e saudáveis que pedem perfume e brilho.",
    result: "Perfume intenso, proteção e controle de frizz.",
    description:
      "Produto de ticket rapido para a cliente levar a experiencia do salao para a rotina.",
  },
  {
    slug: "parfum-ouro-argan",
    name: "Parfum Ouro Argan",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/parfum-ouro-argan.png",
    tagline: "Perfume reconstrutor com textura leve.",
    actives: "Óleos vegetais.",
    indication: "Fios que precisam de perfume, resistência e vitalidade sem peso.",
    result: "Reconstrução leve, maciez intensa e controle de frizz.",
    description:
      "Finalizador com proposta de luxo e tratamento, ideal para complementar servicos de reconstrucao.",
  },
  {
    slug: "oleo-reparador-ouro-argan",
    name: "Óleo Reparador Ouro Argan",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/oleo-reparador-ouro-argan.png",
    tagline: "Óleo de tratamento com brilho radiante.",
    actives: "Óleo de Argan e Óleo de Monoi.",
    indication: "Fios com frizz, opacidade e pontas ressecadas.",
    result: "Nutre profundamente, elimina frizz e restaura brilho.",
    description:
      "Elixir de tratamento para vender no checkout e reforçar o resultado visual do serviço.",
  },
  {
    slug: "luxe-oil-spa",
    name: "Luxe Oil Spa",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/luxe-oil-spa.png",
    tagline: "Reconstrução total com toque de brilho.",
    actives: "Sistema reparador com proteção solar.",
    indication: "Cabelos que precisam de reparação profunda e acabamento impecável.",
    result: "Protege dos danos solares e recupera brilho.",
    description:
      "Óleo premium para finalizar serviços de tratamento e manter sensação de cabelo tratado por mais tempo.",
  },
  {
    slug: "acai-oil",
    name: "Açaí Oil",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/acai-oil.png",
    tagline: "Alto poder nutritivo com proteção térmica.",
    actives: "Omegas 3 e 9 e vitaminas.",
    indication: "Fios que precisam selar cutícula e combater radicais livres.",
    result: "Sela, nutre, protege do calor e restaura a fibra.",
    description:
      "Óleo nutritivo para rotina de finalização, indicado para brilho rápido e proteção antes de fonte de calor.",
  },
  {
    slug: "ta-liso-zero-frizz",
    name: "Tá Liso Zero Frizz",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/ta-liso-zero-frizz.png",
    tagline: "Óleo pós-selagem com proteção térmica 230 graus.",
    actives: "Sistema leve de blindagem de cutículas.",
    indication: "Cabelos com química, frizz e pontas duplas.",
    result: "Blinda cutículas, prolonga o liso e entrega brilho espelhado.",
    description:
      "Finalizador ideal para clientes que fizeram selagem ou progressiva e precisam manter o resultado em casa.",
  },
  {
    slug: "perfect-argan-macadamia",
    name: "Perfect Argan e Macadâmia",
    category: "Lavatório",
    pain: "lavatory",
    audiences: ["b2b"],
    image: "assets/products/perfect-argan-macadamia.png",
    tagline: "Shampoo e condicionador profissional em galão 5L.",
    actives: "Argan e macadâmia.",
    indication: "Operação de alto giro em lavatórios profissionais.",
    result: "Hidratação com custo-benefício para rotina do salão.",
    description:
      "Linha operacional para salões que precisam de rendimento, padronização de atendimento e boa experiência no lavatório.",
  },
];

const state = {
  pain: "all",
  audience: "all",
  search: "",
  interest: new Set(JSON.parse(localStorage.getItem("autentica-interest") || "[]")),
};

const audienceLabels = {
  b2b: "SALÃO",
  b2c: "CASA",
  revenda: "REVENDA",
};

const elements = {
  painFilters: document.querySelector("#painFilters"),
  audienceFilters: document.querySelector("#audienceFilters"),
  searchInput: document.querySelector("#searchInput"),
  searchForm: document.querySelector("#searchForm"),
  clearSearch: document.querySelector("#clearSearch"),
  productGrid: document.querySelector("#productGrid"),
  emptyState: document.querySelector("#emptyState"),
  sectionTitle: document.querySelector("#sectionTitle"),
  currentContext: document.querySelector("#currentContext"),
  visibleCount: document.querySelector("#visibleCount"),
  requestVisible: document.querySelector("#requestVisible"),
  modal: document.querySelector("#productModal"),
  backdrop: document.querySelector("#modalBackdrop"),
  closeModal: document.querySelector("#closeModal"),
  modalImage: document.querySelector("#modalImage"),
  modalTitle: document.querySelector("#modalTitle"),
  modalCategory: document.querySelector("#modalCategory"),
  modalDescription: document.querySelector("#modalDescription"),
  modalActives: document.querySelector("#modalActives"),
  modalIndication: document.querySelector("#modalIndication"),
  modalResult: document.querySelector("#modalResult"),
  modalWhatsapp: document.querySelector("#modalWhatsapp"),
  modalAdd: document.querySelector("#modalAdd"),
  openInterest: document.querySelector("#openInterest"),
  closeInterest: document.querySelector("#closeInterest"),
  interestDrawer: document.querySelector("#interestDrawer"),
  interestCount: document.querySelector("#interestCount"),
  interestList: document.querySelector("#interestList"),
  clearInterest: document.querySelector("#clearInterest"),
  sendInterest: document.querySelector("#sendInterest"),
};

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCategory(product) {
  return pains.find((item) => item.id === product.pain) || pains[0];
}

function buildWhatsappUrl(productsToSend) {
  const items = Array.isArray(productsToSend) ? productsToSend : [productsToSend];
  const productLines = items.map((product) => `- ${product.name}`).join("\n");
  const message = `Olá, quero informações sobre:\n${productLines}\n\nCatálogo Autêntica Professional`;
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${encodedMessage}` : `https://wa.me/?text=${encodedMessage}`;
}

function matchesProduct(product) {
  const matchesPain = state.pain === "all" || product.pain === state.pain;
  const matchesAudience = state.audience === "all" || product.audiences.includes(state.audience);
  const haystack = normalizeText(
    `${product.name} ${product.category} ${product.tagline} ${product.actives} ${product.indication} ${product.result}`
  );
  const matchesSearch = !state.search || haystack.includes(normalizeText(state.search));
  return matchesPain && matchesAudience && matchesSearch;
}

function getVisibleProducts() {
  return products.filter(matchesProduct);
}

function renderPainFilters() {
  elements.painFilters.innerHTML = pains
    .map(
      (pain) => `
        <button class="${state.pain === pain.id ? "is-active" : ""}" type="button" data-pain="${pain.id}">
          ${pain.label}
        </button>
      `
    )
    .join("");
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  const currentPain = pains.find((pain) => pain.id === state.pain) || pains[0];

  elements.sectionTitle.textContent = currentPain.title;
  elements.currentContext.textContent = currentPain.context;
  elements.visibleCount.textContent = visibleProducts.length;
  elements.emptyState.hidden = visibleProducts.length > 0;
  elements.requestVisible.href = buildWhatsappUrl(visibleProducts);
  elements.requestVisible.setAttribute("aria-disabled", visibleProducts.length === 0 ? "true" : "false");

  elements.productGrid.innerHTML = visibleProducts
    .map((product) => {
      const category = getCategory(product);
      const isAdded = state.interest.has(product.slug);

      return `
        <article class="product-card">
          <div class="product-media">
            <div class="audience-tags">
              ${product.audiences.map((audience) => `<span>${audienceLabels[audience]}</span>`).join("")}
            </div>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="product-body">
            <span class="category-pill">${category.label}</span>
            <h3>${product.name}</h3>
            <p>${product.tagline}</p>
            <div class="result-line">${product.result}</div>
            <div class="card-actions">
              <button class="details-button" type="button" data-product="${product.slug}">Ver detalhes</button>
              <button class="add-button" type="button" data-add="${product.slug}" aria-label="Adicionar ${product.name} à lista">
                ${isAdded ? "✓" : "+"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderInterest() {
  const selected = products.filter((product) => state.interest.has(product.slug));
  elements.interestCount.textContent = selected.length;
  elements.sendInterest.href = selected.length ? buildWhatsappUrl(selected) : buildWhatsappUrl(getVisibleProducts());

  if (!selected.length) {
    elements.interestList.innerHTML = `<p class="empty-state">Nenhum produto selecionado ainda.</p>`;
    return;
  }

  elements.interestList.innerHTML = selected
    .map(
      (product) => `
        <div class="interest-item">
          <img src="${product.image}" alt="${product.name}">
          <div>
            <strong>${product.name}</strong>
            <span>${product.category}</span>
          </div>
          <button class="remove-interest" type="button" data-remove="${product.slug}" aria-label="Remover ${product.name}">&times;</button>
        </div>
      `
    )
    .join("");
}

function setAudience(audience) {
  state.audience = audience;
  elements.audienceFilters.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.audience === audience);
  });
  renderProducts();
}

function toggleInterest(slug) {
  if (state.interest.has(slug)) {
    state.interest.delete(slug);
  } else {
    state.interest.add(slug);
  }

  localStorage.setItem("autentica-interest", JSON.stringify([...state.interest]));

  renderProducts();
  renderInterest();
}

function openProduct(slug) {
  const product = products.find((item) => item.slug === slug);
  if (!product) return;

  elements.modalImage.src = product.image;
  elements.modalImage.alt = product.name;
  elements.modalTitle.textContent = product.name;
  elements.modalCategory.textContent = `${getCategory(product).label} / ${product.category}`;
  elements.modalDescription.textContent = product.description;
  elements.modalActives.textContent = product.actives;
  elements.modalIndication.textContent = product.indication;
  elements.modalResult.textContent = product.result;
  elements.modalWhatsapp.href = buildWhatsappUrl(product);
  elements.modalAdd.dataset.add = product.slug;
  elements.modalAdd.textContent = state.interest.has(product.slug) ? "Remover da lista" : "Adicionar à lista";

  elements.backdrop.hidden = false;
  elements.modal.hidden = false;
  elements.closeModal.focus();
}

function closeProduct() {
  elements.backdrop.hidden = true;
  elements.modal.hidden = true;
}

function openInterestDrawer() {
  renderInterest();
  elements.interestDrawer.hidden = false;
}

function closeInterestDrawer() {
  elements.interestDrawer.hidden = true;
}

function bindEvents() {
  elements.searchForm.addEventListener("submit", (event) => event.preventDefault());
  elements.painFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-pain]");
    if (!button) return;
    state.pain = button.dataset.pain;
    renderPainFilters();
    renderProducts();
  });

  elements.audienceFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-audience]");
    if (!button) return;
    setAudience(button.dataset.audience);
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    renderProducts();
  });

  elements.clearSearch.addEventListener("click", () => {
    state.search = "";
    elements.searchInput.value = "";
    renderProducts();
  });

  elements.productGrid.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-product]");
    const addButton = event.target.closest("[data-add]");

    if (detailButton) openProduct(detailButton.dataset.product);
    if (addButton) toggleInterest(addButton.dataset.add);
  });

  elements.modalAdd.addEventListener("click", () => {
    toggleInterest(elements.modalAdd.dataset.add);
    openProduct(elements.modalAdd.dataset.add);
  });

  elements.closeModal.addEventListener("click", closeProduct);
  elements.backdrop.addEventListener("click", () => {
    closeProduct();
    closeInterestDrawer();
  });

  elements.openInterest.addEventListener("click", openInterestDrawer);
  elements.closeInterest.addEventListener("click", closeInterestDrawer);

  elements.interestList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;
    toggleInterest(button.dataset.remove);
  });

  elements.clearInterest.addEventListener("click", () => {
    state.interest.clear();
    localStorage.removeItem("autentica-interest");
    renderProducts();
    renderInterest();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeProduct();
    closeInterestDrawer();
  });
}

renderPainFilters();
renderProducts();
renderInterest();
bindEvents();
