const WHATSAPP_NUMBER = "+55 31 98567-4049";
const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
const REQUESTED_PRODUCT_SLUG = new URLSearchParams(window.location.search).get("produto");

const pains = [
  { id: "all", label: "Todos", title: "Catálogo Autêntica Professional", context: "Todos os produtos" },
  { id: "volume", label: "Redução de volume", title: "Transformação e redução de volume", context: "Foco forte B2B" },
  { id: "recovery", label: "Cronograma capilar", title: "Cronograma e recuperação extrema", context: "Tratamentos B2B e B2C" },
  { id: "blond", label: "Loiros / descoloração", title: "Especial loiros e descoloração", context: "Química pesada e manutenção" },
  { id: "scalp", label: "Terapia capilar", title: "Terapia capilar e cuidados específicos", context: "Nicho e retenção" },
  { id: "finish", label: "Finalizadores", title: "Finalização premium", context: "Upsell de lavatório" },
  { id: "lavatory", label: "Uso profissional", title: "Operação profissional", context: "Exclusivo B2B" },
];

const products = [
  {
    slug: "terra-acai",
    name: "Terra Açaí",
    category: "Transformação",
    pain: "volume",
    audiences: ["b2b"],
    image: "assets/drive-products/terra-acai.webp",
    photo: true,
    tagline: "Escova orgânica para liso total com saúde e força.",
    actives: "Blend orgânico.",
    indication: "Redução de volume, alinhamento e controle de frizz em serviços de salão.",
    result: "Alisamento total, fios mais fortes e acabamento saudável.",
    description:
      "Indicada para profissionais que precisam entregar redução de volume com apelo orgânico e resultado visual de alto impacto.",
  },
  {
    slug: "ta-liso",
    name: "Tá Liso",
    category: "Transformação",
    pain: "volume",
    audiences: ["b2b"],
    image: "assets/drive-products/ta-liso.webp",
    photo: true,
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
    image: "assets/products/reforce-xtreme-btx.webp",
    packshotLabel: { title: "Reforce Xtreme", subtitle: "Reposição de massa" },
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
    image: "assets/products/extrato-floresta-luxeplastica.webp",
    packshotLabel: { title: "Extrato Floresta", subtitle: "Luxeplástica" },
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
    image: "assets/products/btx-blond.webp",
    packshotLabel: { title: "BTX Blond", subtitle: "Restaurador capilar" },
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
    image: "assets/drive-products/ouro-argan.webp",
    photo: true,
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
    image: "assets/drive-products/geleia-real.webp",
    photo: true,
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
    image: "assets/drive-products/super-nutri.webp",
    photo: true,
    tagline: "Fusão de lipídeos para pós-química.",
    actives: "Lipídeos e sistema nutritivo.",
    indication: "Pós-mechas, pós-progressiva e fios ressecados.",
    result: "Regenera o manto hidrolipídico e sela áreas porosas.",
    description:
      "Linha de nutrição para recuperar toque, flexibilidade e brilho em cabelos que passaram por processos químicos.",
  },
  {
    slug: "morango-champagne-shampoo-500ml",
    name: "Shampoo Morango & Champagne 500 ml",
    category: "Limpeza e reposição de carbono",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/morango-champagne-shampoo-500ml.webp",
    photo: true,
    tagline: "Limpeza nutritiva para iniciar o protocolo de reposição de carbono.",
    actives: "Vitaminas A, B e C e frutas vermelhas.",
    indication: "Rotinas de cuidado para cabelos com aparência danificada e necessidade de nutrição.",
    result: "Limpa os fios e prepara o cabelo para as próximas etapas da linha.",
    description:
      "Shampoo de 500 ml da linha Morango & Champagne, com proposta antioxidante, redução de danos e nutrição intensa.",
  },
  {
    slug: "morango-champagne-shampoo-1l",
    name: "Shampoo Morango & Champagne 1 L",
    category: "Limpeza profissional",
    pain: "recovery",
    audiences: ["b2b", "revenda"],
    image: "assets/products/morango-champagne-shampoo-1l.webp",
    photo: true,
    tagline: "Formato profissional para protocolos de reposição de carbono.",
    actives: "Vitaminas A, B e C e frutas vermelhas.",
    indication: "Salões e profissionais que precisam de maior rendimento no lavatório.",
    result: "Limpeza preparatória com rendimento para a rotina profissional.",
    description:
      "Versão de 1 litro do shampoo Morango & Champagne, indicada para integrar protocolos profissionais de cuidado nutritivo.",
  },
  {
    slug: "morango-champagne-condicionador-500ml",
    name: "Condicionador Morango & Champagne 500 ml",
    category: "Condicionamento",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/morango-champagne-condicionador-500ml.webp",
    photo: true,
    tagline: "Condicionamento nutritivo com ação antioxidante.",
    actives: "Vitaminas A, B e C e frutas vermelhas.",
    indication: "Cabelos com aparência danificada que precisam de cuidado e nutrição.",
    result: "Complementa a rotina deixando os fios com aspecto mais cuidado.",
    description:
      "Condicionador de 500 ml para complementar a rotina de reposição de carbono da linha Morango & Champagne.",
  },
  {
    slug: "morango-champagne-condicionador-1l",
    name: "Condicionador Morango & Champagne 1 L",
    category: "Condicionamento profissional",
    pain: "recovery",
    audiences: ["b2b", "revenda"],
    image: "assets/products/morango-champagne-condicionador-1l.webp",
    photo: true,
    tagline: "Condicionamento profissional com nutrição intensa.",
    actives: "Vitaminas A, B e C e frutas vermelhas. Faixa de pH indicada no rótulo: 4,5 a 5,5.",
    indication: "Uso profissional em protocolos de reposição de carbono e cuidado nutritivo.",
    result: "Finaliza a etapa de lavagem e ajuda a manter os fios condicionados.",
    description:
      "Versão profissional de 1 litro do condicionador Morango & Champagne, pensada para maior rendimento no salão.",
  },
  {
    slug: "morango-champagne-mascara-500g",
    name: "Máscara Morango & Champagne 500 g",
    category: "Tratamento",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/morango-champagne-mascara-500g.webp",
    photo: true,
    tagline: "Tratamento concentrado para reposição de carbono.",
    actives: "Vitaminas A, B e C e frutas vermelhas. Faixa de pH indicada no rótulo: 3,0 a 4,0.",
    indication: "Cabelos com aparência danificada que precisam de uma etapa concentrada de nutrição.",
    result: "Apoia o cuidado da fibra com ação antioxidante e nutrição intensa.",
    description:
      "Máscara de 500 g da linha Morango & Champagne para incluir a reposição de carbono no cronograma capilar.",
  },
  {
    slug: "morango-champagne-mascara-1kg",
    name: "Máscara Morango & Champagne 1 kg",
    category: "Tratamento profissional",
    pain: "recovery",
    audiences: ["b2b", "revenda"],
    image: "assets/products/morango-champagne-mascara-1kg.webp",
    photo: true,
    tagline: "Máscara profissional para protocolos de nutrição intensa.",
    actives: "Vitaminas A, B e C e frutas vermelhas. Faixa de pH indicada no rótulo: 3,0 a 4,0.",
    indication: "Salões que realizam tratamentos de reposição de carbono e recuperação visual dos fios.",
    result: "Entrega uma etapa concentrada de tratamento com rendimento profissional.",
    description:
      "Máscara de 1 kg da linha Morango & Champagne, em tamanho profissional para protocolos de tratamento no salão.",
  },
  {
    slug: "morango-champagne-bb-cream-500ml",
    name: "BB Cream Morango & Champagne 500 ml",
    category: "Finalização do tratamento",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/products/morango-champagne-bb-cream-500ml.webp",
    photo: true,
    tagline: "BB Cream para completar a rotina de reposição de carbono.",
    actives: "Vitaminas A, B e C e frutas vermelhas. Faixa de pH indicada no rótulo: 3,0 a 4,0.",
    indication: "Finalização da rotina Morango & Champagne em cabelos com aparência danificada.",
    result: "Completa o protocolo com cuidado nutritivo e acabamento dos fios.",
    description:
      "BB Cream de 500 ml da linha Morango & Champagne, apresentado como etapa complementar do protocolo de reposição de carbono.",
  },
  {
    slug: "sos",
    name: "S.O.S",
    category: "Hidro nutritivo",
    pain: "recovery",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/drive-products/sos.webp",
    photo: true,
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
    image: "assets/drive-products/desfibrilador.webp",
    photo: true,
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
    image: "assets/drive-products/ampolas-3-etapas.webp",
    photo: true,
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
    image: "assets/products/po-descolorante.webp",
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
    image: "produtos/black-platinum/assets/aplicacao.webp",
    photo: true,
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
    image: "assets/products/silver-blond.webp",
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
    image: "assets/drive-products/vita-hair.webp",
    photo: true,
    tagline: "Blend vitamínico para fios enfraquecidos.",
    actives: "Blend de vitaminas.",
    indication: "Fios fracos após dengue, zika, chikungunya, covid-19 ou queda intensa.",
    result: "Estimula crescimento e devolve força e brilho.",
    description:
      "Linha voltada para terapia capilar e retenção de clientes que buscam fortalecer fios fragilizados.",
  },
  {
    slug: "therapy-detox",
    name: "Therapy Detox",
    category: "Terapia capilar",
    pain: "scalp",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/drive-products/therapy-detox.webp",
    photo: true,
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
    image: "assets/drive-products/coffee.webp",
    photo: true,
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
    pain: "finish",
    audiences: ["b2b", "b2c", "revenda"],
    image: "assets/drive-products/super-cachos.webp",
    photo: true,
    tagline: "Definição, memória do cacho e controle de frizz.",
    actives: "Sistema de tratamento para cabelos ondulados, cacheados e crespos.",
    indication: "Todas as curvaturas que precisam de definição e movimento natural.",
    result: "Reativa memória dos cachos, reduz volume e elimina frizz.",
    description:
      "Linha para valorizar curvaturas com brilho, balanço e forma definida sem perder naturalidade.",
  },
  {
    slug: "inspira-parfum",
    name: "Inspira Parfum",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/inspira-parfum-nova-embalagem.webp",
    photo: true,
    tagline: "Perfume capilar com brilho intenso e efeito antifrizz.",
    actives: "Fragrância capilar com proteção solar declarada no rótulo.",
    indication: "Renovação do perfume e do acabamento dos fios ao longo do dia.",
    result: "Perfuma, realça o brilho e ajuda no controle do frizz.",
    description:
      "Finalizador premium para gerar desejo imediato no lavatório e facilitar a revenda para manutenção em casa.",
  },
  {
    slug: "use-me-parfum",
    name: "Use-Me Parfum",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/use-me-parfum.webp",
    tagline: "Fragrância marcante com proteção solar.",
    actives: "Fragrância capilar, proteção solar e anti-frizz.",
    indication: "Fios alinhados e saudáveis que pedem perfume e brilho.",
    result: "Perfume intenso, proteção e controle de frizz.",
    description:
      "Produto de ticket rápido para a cliente levar a experiência do salão para a rotina.",
  },
  {
    slug: "parfum-ouro-argan",
    name: "Parfum Ouro Argan",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/parfum-ouro-argan.webp",
    tagline: "Perfume reconstrutor com textura leve.",
    actives: "Óleos vegetais.",
    indication: "Fios que precisam de perfume, resistência e vitalidade sem peso.",
    result: "Reconstrução leve, maciez intensa e controle de frizz.",
    description:
      "Finalizador com proposta de luxo e tratamento, ideal para complementar serviços de reconstrução.",
  },
  {
    slug: "oleo-reparador-ouro-argan",
    name: "Óleo Reparador Ouro Argan",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/drive-products/oleo-reparador-ouro-argan.webp",
    photo: true,
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
    image: "assets/products/luxe-oil-spa.webp",
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
    image: "assets/products/acai-oil.webp",
    tagline: "Alto poder nutritivo com proteção térmica.",
    actives: "Omegas 3 e 9 e vitaminas.",
    indication: "Fios que precisam selar cutícula e combater radicais livres.",
    result: "Sela, nutre, protege do calor e restaura a fibra.",
    description:
      "Óleo nutritivo para rotina de finalização, indicado para brilho rápido e proteção antes de fonte de calor.",
  },
  {
    slug: "ta-liso-zero-frizz",
    name: "Tá Liso Finalizador 40 ml",
    category: "Finalização",
    pain: "finish",
    audiences: ["b2c", "revenda"],
    image: "assets/products/ta-liso-finalizador-40ml.webp",
    photo: true,
    tagline: "Hidratação, controle de frizz e selamento dos fios.",
    actives: "Sementes de feno-grego e óleo de girassol orgânico, com proteção térmica e solar declaradas no rótulo.",
    indication: "Finalização de cabelos que precisam de alinhamento, proteção e controle do frizz.",
    result: "Fios mais alinhados, protegidos e luminosos.",
    description:
      "Finalizador de 40 ml da linha Tá Liso para apoiar uma rotina de hidratação, proteção e selamento dos fios.",
  },
  {
    slug: "perfect-argan-macadamia",
    name: "Perfect Argan e Macadâmia",
    category: "Lavatório",
    pain: "lavatory",
    audiences: ["b2b"],
    image: "assets/drive-products/perfect-argan-macadamia.webp",
    photo: true,
    tagline: "Shampoo e condicionador profissional em galão 5L.",
    actives: "Argan e macadâmia.",
    indication: "Operação de alto giro em lavatórios profissionais.",
    result: "Hidratação com custo-benefício para rotina do salão.",
    description:
      "Linha operacional para salões que precisam de rendimento, padronização de atendimento e boa experiência no lavatório.",
  },
];

function readStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "") || fallback;
  } catch {
    return fallback;
  }
}

const savedQuantities = readStoredJson("autentica-order", {});
const legacyInterest = readStoredJson("autentica-interest", []);
localStorage.removeItem("autentica-qualification");

if (!Object.keys(savedQuantities).length && Array.isArray(legacyInterest)) {
  legacyInterest.forEach((slug) => {
    savedQuantities[slug] = 1;
  });
}

const state = {
  pain: new URLSearchParams(window.location.search).get("linha") || "all",
  audience: new URLSearchParams(window.location.search).get("perfil") || "all",
  search: "",
  quantities: savedQuantities,
  modalProductSlug: null,
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
  modalDecrease: document.querySelector("#modalDecrease"),
  modalIncrease: document.querySelector("#modalIncrease"),
  modalQuantity: document.querySelector("#modalQuantity"),
  modalPackshotLabel: document.querySelector("#modalPackshotLabel"),
  openInterest: document.querySelector("#openInterest"),
  closeInterest: document.querySelector("#closeInterest"),
  interestDrawer: document.querySelector("#interestDrawer"),
  interestCount: document.querySelector("#interestCount"),
  interestList: document.querySelector("#interestList"),
  clearInterest: document.querySelector("#clearInterest"),
  sendInterest: document.querySelector("#sendInterest"),
  qualificationForm: document.querySelector("#qualificationForm"),
  customerName: document.querySelector("#customerName"),
  customerProfile: document.querySelector("#customerProfile"),
  businessName: document.querySelector("#businessName"),
  businessNameLabel: document.querySelector("#businessNameLabel"),
  customerCity: document.querySelector("#customerCity"),
  customerZip: document.querySelector("#customerZip"),
  customerAddress: document.querySelector("#customerAddress"),
  customerDocument: document.querySelector("#customerDocument"),
  customerDocumentLabel: document.querySelector("#customerDocumentLabel"),
  customerNotes: document.querySelector("#customerNotes"),
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

function clampQuantity(value) {
  const quantity = Number.parseInt(value, 10);
  if (!Number.isFinite(quantity)) return 0;
  return Math.min(99, Math.max(0, quantity));
}

function getQuantity(slug) {
  return clampQuantity(state.quantities[slug]);
}

function getOrderEntries() {
  return products
    .map((product) => ({ product, quantity: getQuantity(product.slug) }))
    .filter((entry) => entry.quantity > 0);
}

function getTotalUnits() {
  return getOrderEntries().reduce((total, entry) => total + entry.quantity, 0);
}

function persistOrder() {
  localStorage.setItem("autentica-order", JSON.stringify(state.quantities));
  localStorage.removeItem("autentica-interest");
}

function getQualification() {
  return {
    name: elements.customerName.value.trim(),
    profile: elements.customerProfile.value,
    business: elements.businessName.value.trim(),
    city: elements.customerCity.value.trim(),
    zip: elements.customerZip.value.trim(),
    address: elements.customerAddress.value.trim(),
    document: elements.customerDocument.value.trim(),
    notes: elements.customerNotes.value.trim(),
  };
}

function buildWhatsappUrl(orderToSend, qualification = {}) {
  const rawEntries = Array.isArray(orderToSend) ? orderToSend : [orderToSend];
  const entries = rawEntries
    .map((entry) => (entry.product ? entry : { product: entry, quantity: 1 }))
    .filter((entry) => entry.product && clampQuantity(entry.quantity) > 0);

  let message;
  if (entries.length === 1) {
    const [{ product, quantity }] = entries;
    message = `Vi o ${product.name} no catálogo e quero comprar.\nQuantidade: ${quantity}`;
  } else {
    const productLines = entries.map(({ product, quantity }) => `- ${quantity}x ${product.name}`).join("\n");
    const total = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    message = `Vi estes produtos no catálogo e quero comprar:\n${productLines}\n\nTotal: ${total} unidades`;
  }

  const qualificationLines = [
    qualification.name && `Nome: ${qualification.name}`,
    qualification.profile && `Perfil: ${qualification.profile}`,
    qualification.business && `Salão/negócio: ${qualification.business}`,
    qualification.city && `Cidade/UF: ${qualification.city}`,
    qualification.zip && `CEP: ${qualification.zip}`,
    qualification.address && `Endereço: ${qualification.address}`,
    qualification.document && `CNPJ: ${qualification.document}`,
    qualification.notes && `Observações: ${qualification.notes}`,
  ].filter(Boolean);

  if (qualificationLines.length) {
    message += `\n\nDados para atendimento:\n${qualificationLines.join("\n")}`;
  }

  message += "\n\nCatálogo Autêntica Professional";
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
        <button class="${state.pain === pain.id ? "is-active" : ""}" type="button" data-pain="${pain.id}" aria-pressed="${state.pain === pain.id}">
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
  elements.requestVisible.textContent = getTotalUnits() ? `Ver pedido (${getTotalUnits()})` : "Ver pedido";

  elements.productGrid.innerHTML = visibleProducts
    .map((product, index) => {
      const category = getCategory(product);
      const quantity = getQuantity(product.slug);
      const isPriorityImage = index === 0;
      const imageSource = isPriorityImage ? product.image : TRANSPARENT_PIXEL;
      const deferredSource = isPriorityImage ? "" : ` data-src="${product.image}"`;
      const loading = isPriorityImage ? "eager" : "lazy";
      const fetchPriority = index === 0 ? "high" : "auto";
      const packshotLabel = product.packshotLabel
        ? `<div class="packshot-label"><strong>${product.packshotLabel.title}</strong><span>${product.packshotLabel.subtitle}</span></div>`
        : "";

      return `
        <article class="product-card ${product.photo ? "has-photo" : ""}">
          <div class="product-media">
            <div class="audience-tags">
              ${product.audiences.map((audience) => `<span>${audienceLabels[audience]}</span>`).join("")}
            </div>
            <img src="${imageSource}"${deferredSource} alt="${product.name}" loading="${loading}" decoding="async" fetchpriority="${fetchPriority}">
            ${packshotLabel}
          </div>
          <div class="product-body">
            <span class="category-pill">${category.label}</span>
            <h3>${product.name}</h3>
            <p>${product.tagline}</p>
            <div class="result-line">${product.result}</div>
            <div class="product-order-row">
              <span>Quantidade</span>
              <div class="quantity-stepper" aria-label="Quantidade de ${product.name}">
                <button type="button" data-quantity-change="-1" data-slug="${product.slug}" aria-label="Diminuir ${product.name}">−</button>
                <output data-quantity-output="${product.slug}" aria-live="polite">${quantity}</output>
                <button type="button" data-quantity-change="1" data-slug="${product.slug}" aria-label="Aumentar ${product.name}">+</button>
              </div>
            </div>
            <div class="card-actions">
              <button class="details-button" type="button" data-product="${product.slug}">Ver detalhes</button>
              <button class="buy-button" type="button" data-buy="${product.slug}" aria-label="Comprar ${product.name}">Comprar</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  observeProductImages();
}

function observeProductImages() {
  const deferredImages = elements.productGrid.querySelectorAll("img[data-src]");

  if (!("IntersectionObserver" in window)) {
    deferredImages.forEach((image) => {
      image.src = image.dataset.src;
      image.removeAttribute("data-src");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const image = entry.target;
        image.src = image.dataset.src;
        image.removeAttribute("data-src");
        observer.unobserve(image);
      });
    },
    { rootMargin: "240px 0px" }
  );

  deferredImages.forEach((image) => observer.observe(image));
}

function renderInterest() {
  const selected = getOrderEntries();
  const totalUnits = getTotalUnits();
  elements.interestCount.textContent = totalUnits;
  elements.sendInterest.disabled = selected.length === 0;
  elements.requestVisible.textContent = totalUnits ? `Ver pedido (${totalUnits})` : "Ver pedido";

  if (!selected.length) {
    elements.interestList.innerHTML = `<p class="empty-state">Seu pedido está vazio. Use os controles de quantidade nos produtos para começar.</p>`;
    return;
  }

  elements.interestList.innerHTML = selected
    .map(
      ({ product, quantity }) => `
        <div class="interest-item">
          <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
          <div>
            <strong>${product.name}</strong>
            <span>${product.category}</span>
            <div class="quantity-stepper quantity-stepper-small" aria-label="Quantidade de ${product.name}">
              <button type="button" data-quantity-change="-1" data-slug="${product.slug}" aria-label="Diminuir ${product.name}">−</button>
              <output aria-live="polite">${quantity}</output>
              <button type="button" data-quantity-change="1" data-slug="${product.slug}" aria-label="Aumentar ${product.name}">+</button>
            </div>
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
    const isActive = button.dataset.audience === audience;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
}

function syncInitialFilters() {
  if (!pains.some((pain) => pain.id === state.pain)) state.pain = "all";
  if (!["all", "b2b", "b2c", "revenda"].includes(state.audience)) state.audience = "all";
  elements.audienceFilters.querySelectorAll("button").forEach((button) => {
    const isActive = button.dataset.audience === state.audience;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setQuantity(slug, value) {
  const quantity = clampQuantity(value);
  if (quantity > 0) state.quantities[slug] = quantity;
  else delete state.quantities[slug];
  persistOrder();
  renderProducts();
  renderInterest();
  updateModalQuantity();
}

function changeQuantity(slug, delta) {
  setQuantity(slug, getQuantity(slug) + delta);
}

function ensureProductInOrder(slug) {
  if (!getQuantity(slug)) setQuantity(slug, 1);
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
  elements.modalPackshotLabel.hidden = !product.packshotLabel;
  elements.modalPackshotLabel.innerHTML = product.packshotLabel
    ? `<strong>${product.packshotLabel.title}</strong><span>${product.packshotLabel.subtitle}</span>`
    : "";
  state.modalProductSlug = product.slug;
  elements.modalAdd.dataset.add = product.slug;
  elements.modalAdd.textContent = getQuantity(product.slug) ? "Atualizar pedido" : "Adicionar ao pedido";
  elements.modal.classList.toggle("has-photo", Boolean(product.photo));
  updateModalQuantity();

  elements.modal.hidden = false;
  syncOverlayState();
  elements.closeModal.focus();
}

function closeProduct() {
  elements.modal.hidden = true;
  state.modalProductSlug = null;
  syncOverlayState();
}

function openInterestDrawer() {
  renderInterest();
  elements.interestDrawer.hidden = false;
  syncOverlayState();
}

function closeInterestDrawer() {
  elements.interestDrawer.hidden = true;
  syncOverlayState();
}

function syncOverlayState() {
  const hasOpenOverlay = !elements.modal.hidden || !elements.interestDrawer.hidden;
  elements.backdrop.hidden = !hasOpenOverlay;
  document.body.classList.toggle("is-locked", hasOpenOverlay);
}

function updateModalQuantity() {
  if (!state.modalProductSlug) return;
  elements.modalQuantity.textContent = getQuantity(state.modalProductSlug);
  elements.modalAdd.textContent = getQuantity(state.modalProductSlug) ? "Atualizar pedido" : "Adicionar ao pedido";
}

function openCheckoutForProduct(slug) {
  ensureProductInOrder(slug);
  closeProduct();
  openInterestDrawer();
  window.setTimeout(() => elements.customerName.focus(), 0);
}

function updateBusinessRequirement() {
  const needsBusiness = elements.customerProfile.value && elements.customerProfile.value !== "Cliente final";
  elements.businessName.required = Boolean(needsBusiness);
  elements.businessNameLabel.hidden = !needsBusiness;
  elements.customerDocumentLabel.hidden = !needsBusiness;
  elements.businessNameLabel.classList.toggle("is-required", Boolean(needsBusiness));
}

function sendOrderToWhatsapp(event) {
  event.preventDefault();
  const entries = getOrderEntries();
  if (!entries.length || !elements.qualificationForm.reportValidity()) return;

  const whatsappUrl = buildWhatsappUrl(entries, getQualification());
  const link = document.createElement("a");
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.append(link);
  link.click();
  link.remove();
}

function openRequestedProduct() {
  if (!REQUESTED_PRODUCT_SLUG || !products.some((product) => product.slug === REQUESTED_PRODUCT_SLUG)) return;
  ensureProductInOrder(REQUESTED_PRODUCT_SLUG);
  openInterestDrawer();
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
    const buyButton = event.target.closest("[data-buy]");
    const quantityButton = event.target.closest("[data-quantity-change]");

    if (detailButton) {
      event.preventDefault();
      openProduct(detailButton.dataset.product);
    }
    if (buyButton) openCheckoutForProduct(buyButton.dataset.buy);
    if (quantityButton) changeQuantity(quantityButton.dataset.slug, Number(quantityButton.dataset.quantityChange));
  });

  elements.modalAdd.addEventListener("click", () => {
    ensureProductInOrder(elements.modalAdd.dataset.add);
    updateModalQuantity();
  });
  elements.modalDecrease.addEventListener("click", () => changeQuantity(state.modalProductSlug, -1));
  elements.modalIncrease.addEventListener("click", () => changeQuantity(state.modalProductSlug, 1));
  elements.modalWhatsapp.addEventListener("click", () => openCheckoutForProduct(state.modalProductSlug));

  elements.closeModal.addEventListener("click", closeProduct);
  elements.backdrop.addEventListener("click", () => {
    closeProduct();
    closeInterestDrawer();
  });

  elements.openInterest.addEventListener("click", openInterestDrawer);
  elements.closeInterest.addEventListener("click", closeInterestDrawer);
  elements.requestVisible.addEventListener("click", openInterestDrawer);

  elements.interestList.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove]");
    const quantityButton = event.target.closest("[data-quantity-change]");
    if (removeButton) setQuantity(removeButton.dataset.remove, 0);
    if (quantityButton) changeQuantity(quantityButton.dataset.slug, Number(quantityButton.dataset.quantityChange));
  });

  elements.clearInterest.addEventListener("click", () => {
    state.quantities = {};
    persistOrder();
    renderProducts();
    renderInterest();
  });

  elements.customerProfile.addEventListener("change", updateBusinessRequirement);
  elements.customerZip.addEventListener("input", (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 8);
    event.target.value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  });
  elements.qualificationForm.addEventListener("submit", sendOrderToWhatsapp);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeProduct();
    closeInterestDrawer();
  });
}

syncInitialFilters();
updateBusinessRequirement();
renderPainFilters();
renderProducts();
renderInterest();
bindEvents();
openRequestedProduct();
