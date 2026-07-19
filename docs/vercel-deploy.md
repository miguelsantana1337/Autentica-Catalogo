# Deploy na Vercel

## Configuração do projeto

Importe o repositório na Vercel usando a raiz do projeto. O repositório já fixa:

- framework `nextjs`;
- build `pnpm build`;
- Node.js `24.x`;
- pnpm `10.34.5` pelo campo `packageManager`.

Não configure diretório de saída. O adaptador do Next.js é detectado pela
Vercel e publica páginas estáticas, rotas dinâmicas, APIs e o proxy do projeto.

## Variáveis para produção

Copie o contrato de `.env.example` para **Settings > Environment Variables**.
As variáveis abaixo são necessárias para liberar o painel e persistir dados:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-chave-publicavel
SUPABASE_SERVICE_ROLE_KEY=sua-chave-de-servico
PLATFORM_ADMIN_EMAILS=admin@suaempresa.com.br
STOREFRONT_SECURITY_SECRET=gere-um-segredo-longo-e-aleatorio
```

Configure também a identidade pública da instalação:

```env
NEXT_PUBLIC_CLIENT_ID=mv3-catalog
NEXT_PUBLIC_STORE_NAME=MV3 Catalog
NEXT_PUBLIC_ORDER_PREFIX=MV3
NEXT_PUBLIC_STORE_WHATSAPP=5500000000000
NEXT_PUBLIC_STORE_EMAIL=contato@suaempresa.com.br
NEXT_PUBLIC_PRIMARY_COLOR=#1677ff
NEXT_PUBLIC_SECONDARY_COLOR=#69a8ff
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
```

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` são opcionais, mas
recomendados para proteger o checkout público. `SAAS_ROOT_DOMAIN` é necessário
somente para o roteamento por subdomínio curinga.

Nunca exponha `SUPABASE_SERVICE_ROLE_KEY`, `STOREFRONT_SECURITY_SECRET` ou
`TURNSTILE_SECRET_KEY` com o prefixo `NEXT_PUBLIC_`.

## Preparar o Supabase

Antes do primeiro deploy de produção:

1. crie um projeto Supabase exclusivo para a plataforma;
2. aplique, em ordem, os arquivos de `supabase/migrations`;
3. em uma base nova, execute `supabase/seed.sql` uma única vez;
4. crie o primeiro usuário no Supabase Auth;
5. promova esse usuário conforme o comando comentado no final do seed e defina
   `is_platform_admin = true` no perfil;
6. adicione o mesmo e-mail em `PLATFORM_ADMIN_EMAILS` na Vercel;
7. cadastre no Supabase Auth as URLs de produção e preview autorizadas.

Não execute o seed sobre uma base que já contenha dados reais.

## Publicar

Faça primeiro um deploy de preview e valide:

- `/` e `/loja/mv3-catalog` carregam a vitrine;
- `/admin/login` autentica com o Supabase e exige MFA;
- `/saas` abre somente para o administrador da plataforma;
- um pedido de teste aparece no painel e gera o link correto do WhatsApp;
- `/api/admin/health` mostra banco, autenticação, auditoria e deploy saudáveis.

Depois promova o mesmo commit para produção e configure o domínio. O modo
administrativo demonstrativo é bloqueado automaticamente no ambiente
`production` da Vercel quando o Supabase não está configurado.
