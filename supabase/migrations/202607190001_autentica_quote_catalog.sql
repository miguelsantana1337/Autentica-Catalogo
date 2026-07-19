-- Campos white-label usados pela Autêntica para catálogo consultivo sem preços.

alter table public.store_settings
  add column if not exists show_prices boolean not null default true;

alter table public.products
  add column if not exists tagline text not null default '',
  add column if not exists need text not null default '',
  add column if not exists audiences text[] not null default '{}'::text[],
  add column if not exists indication text not null default '',
  add column if not exists result text not null default '';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_audiences_check'
      and conrelid = 'public.products'::regclass
  ) then
    alter table public.products
      add constraint products_audiences_check
      check (audiences <@ array['b2b', 'b2c', 'resale']::text[]);
  end if;
end $$;

comment on column public.store_settings.show_prices is
  'Controla a exposição pública de preços e totais na jornada de catálogo.';
comment on column public.products.need is
  'Necessidade principal usada no filtro consultivo do catálogo.';
comment on column public.products.audiences is
  'Perfis atendidos: b2b, b2c e resale.';

-- Recria a allowlist pública incluindo apenas os novos campos comerciais.
drop view if exists public.storefront_products;
create view public.storefront_products
with (security_barrier = true, security_invoker = false)
as
with availability as (
  select
    product.tenant_id,
    product.id,
    greatest(
      0,
      product.stock - coalesce(sum(reservation.quantity) filter (
        where reservation.status = 'active' and reservation.expires_at > now()
      ), 0)
    )::integer as available_quantity
  from public.products product
  left join public.order_stock_reservations reservation
    on reservation.tenant_id = product.tenant_id
   and reservation.product_id = product.id
  group by product.tenant_id, product.id, product.stock
)
select
  product.tenant_id,
  product.id,
  product.slug,
  product.name,
  product.category_id,
  product.brand,
  product.price,
  product.compare_at,
  product.cashback,
  product.badge,
  product.accent,
  product.description,
  product.tagline,
  product.need,
  product.audiences,
  product.indication,
  product.result,
  product.rating,
  product.reviews,
  product.featured,
  product.active,
  product.order_index,
  product.image_url,
  product.image_urls,
  product.product_type,
  product.regulatory_status,
  product.active_ingredient,
  product.anvisa_registration,
  product.presentation,
  product.regulatory_warning,
  product.pharmacist_reviewed,
  case
    when availability.available_quantity <= 0 then 'out_of_stock'
    when availability.available_quantity <= 5 then 'low_stock'
    else 'in_stock'
  end as availability,
  case
    when availability.available_quantity <= 0 then 0
    when availability.available_quantity <= 5 then 1
    when availability.available_quantity <= 10 then 5
    else 10
  end as purchase_limit
from public.products product
join public.tenants tenant on tenant.id = product.tenant_id
join availability
  on availability.tenant_id = product.tenant_id
 and availability.id = product.id
where product.active = true
  and tenant.status in ('trial', 'active');

revoke all on table public.storefront_products from public, anon, authenticated;
grant select on table public.storefront_products to anon, authenticated;
