# Página de Confirmação de Presença — `/convite`

**Data:** 2026-08-06
**Contexto:** Convite para o evento *JDM Experience BBQ Edition* (23/08, 12h). Membros
selecionados recebem o link e confirmam presença. Os dados vão para um novo database do
Notion, seguindo o mesmo padrão da lista de espera.

## Objetivo

Uma página simples, mobile-first e intuitiva onde o convidado confirma presença informando:
Nome, Carro, Telefone e Tamanho de camiseta (P/M/G/GG).

## Arquitetura

Espelha o fluxo da lista de espera (desacoplado e trocável):

```
ConvitePage (form)  ──POST /api/rsvp──▶  Notion pages.create (novo DB)
```

### Arquivos

| Arquivo | Papel |
|---|---|
| `src/components/ConvitePage.tsx` | Página completa: resumo do evento + formulário + tela de sucesso |
| `src/lib/rsvp.ts` | Bridge `submitToRsvp()` + interface `RsvpEntry` |
| `api/rsvp.ts` | Handler Vercel self-contained → grava no Notion |
| `src/routes.tsx` | Rotas SSG: `/` (LP) e `/convite` (ConvitePage) |
| `src/main.tsx` | Migra de `single-page` para modo multi-rota do `vite-react-ssg` |
| `vercel.json` | Header `X-Robots-Tag: noindex` para `/convite` |

### Roteamento

O site é single-page SSG. Migra para o modo multi-rota do `vite-react-ssg` (adiciona
`react-router-dom`, peer-dep). Cada rota vira HTML estático próprio; a saída de `/`
permanece idêntica (SEO intacto). `/convite` recebe `X-Robots-Tag: noindex` via header na
Vercel — link privado, não deve ser indexado.

## Formulário (UX)

- **Nome** — texto, obrigatório, mesma validação da lista de espera.
- **Carro** — texto livre, obrigatório (ex.: modelo/projeto que representa a CASA).
- **Telefone** — máscara `(XX) XXXXX-XXXX`, obrigatório, `inputMode="numeric"`.
- **Tamanho de camiseta** — 4 botões segmentados **P / M / G / GG**, obrigatório, alvo de
  toque grande.
- Botão único dourado **"Confirmar presença"** → tela de sucesso "Presença confirmada!".
- Honeypot anti-spam (`_trap`), validação client-side, reuso das classes/tokens
  (`.form-input`, `.btn-gold`, cores gold/cream).
- Topo da página: branding CASA + evento (JDM Experience BBQ Edition · 23 Ago, 12h) e a
  lista do que a CASA oferece.

## Backend / Notion

- **Database ID:** `3b4b20ec611980dd83a6de7ef9859fcd` → env var `NOTION_RSVP_DATABASE_ID`.
- Reusa `NOTION_TOKEN` (mesma integração da lista de espera; DB compartilhado com ela).
- Propriedades (nomes exatos do DB):
  - `Nome` (title)
  - `Carro` (rich_text)
  - `Telefone` (phone_number)
  - `Tamanho Camiseta` (select) — valores P/M/G/GG criados on-the-fly.
- Validação server-side: `nome`, `carro`, `telefone`, `camiseta` obrigatórios → 400 se faltar.
- Respostas: `200 { ok: true }` / `4xx { error }` (mensagem exibida ao usuário).

## Fora de escopo

- E-mail de confirmação / integração WhatsApp automática.
- Edição/cancelamento de RSVP.
- Autenticação (link privado é o "gate").
