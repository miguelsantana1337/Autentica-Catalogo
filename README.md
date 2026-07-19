# Autêntica Professional — catálogo interativo e painel administrativo

Instância white-label criada a partir do núcleo MV3 Catalog. A loja e o painel
administrativo vivem na mesma aplicação Next.js e compartilham os dados do
Supabase exclusivo da Autêntica.

## Rodar localmente

```bash
pnpm install
pnpm dev
```

- Loja: http://localhost:3000
- Painel: http://localhost:3000/admin
- Login local: `admin@autentica.demo`
- Senha local: `autentica-demo-123`

## Personalização

As configurações de identidade ficam em `.env.local`. Produtos, categorias,
banners, páginas, cores e dados operacionais podem ser alterados no painel. O
seed inicial contém os 34 produtos e as 20 categorias migradas do catálogo
original, com filtros por necessidade e perfil de atendimento.

## Supabase

O projeto Supabase exclusivo já reservado para esta instância usa o ref
`ibxucjvllribciyfjlee`. Configure as três variáveis do Supabase em `.env.local`,
aplique as migrações em ordem e execute `supabase/seed.sql`. Nunca reutilize
banco, chaves de serviço ou usuários entre clientes.

## Operação

Esta base registra uma solicitação de orçamento e abre a mensagem pronta no
WhatsApp da loja. Preços, disponibilidade, pagamento e entrega são confirmados
no atendimento. A aplicação não realiza cobrança automática.

## Publicação

A prévia deve ser publicada em um projeto Vercel exclusivo da Autêntica. A
branch de migração pode operar na Vercel sem alterar o site legado da Netlify;
domínio e DNS só devem ser trocados após homologação explícita.

Veja também [docs/reusable-base.md](docs/reusable-base.md).
