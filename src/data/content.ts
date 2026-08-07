// ── Header / footer navigation ───────────────────────────────────────────

export const navLinks = [
  { href: '#o-casa', label: 'A CASA' },
  { href: '#casa-box', label: 'CASA Box' },
  { href: '#pocket-casa', label: 'Pocket CASA' },
  { href: '#comunidade', label: 'Comunidade' },
  { href: '#app', label: 'App' },
  { href: '#visao-futura', label: 'Visão Futura' },
]

// The mobile menu shows the six nav links plus Parceiros.
export const mobileNavLinks = [...navLinks, { href: '#parceiros', label: 'Parceiros' }]

// ── Status strip (#o-casa) ────────────────────────────────────────────────

export type StatusTone = 'active' | 'soon' | 'future'

export interface StatusItem {
  tone: StatusTone
  label: string
  title: string
  body: string
}

export const statusItems: StatusItem[] = [
  {
    tone: 'active',
    label: 'Já está acontecendo',
    title: 'Comunidade e Pocket CASA',
    body: 'Encontros, grupo ativo e um espaço da CASA dentro da Vortex Detail.',
  },
  {
    tone: 'soon',
    label: 'Chegando em breve',
    title: 'CASA Box e app MVP',
    body: 'A assinatura entra em pré-venda e a primeira versão do app está pronta.',
  },
  {
    tone: 'future',
    label: 'Visão futura',
    title: 'Sede definitiva',
    body: 'Uma sede própria para o clube. Ainda em projeto.',
  },
]

// ── CASA Box tiers (#casa-box) — no prices, by client decision ────────────

export interface Tier {
  name: string
  image: string
  alt: string
  description: string
  featured?: boolean
  foundingLabel?: string
}

export const tiers: Tier[] = [
  {
    name: 'Bronze',
    image: '/assets/lp/tier-bronze.jpg',
    alt: 'CASA Box Bronze aberta, com adesivos, chaveiro, lanterna, flanela e necessaire.',
    description: 'Cinco itens da CASA para usar no dia a dia com o seu carro.',
  },
  {
    name: 'Prata',
    image: '/assets/lp/tier-prata.jpg',
    alt: 'CASA Box Prata aberta, com adesivos, chaveiro, flanela e necessaire.',
    description: 'Tudo do Bronze, mais um item premium por mês.',
  },
  {
    name: 'Ouro',
    image: '/assets/lp/tier-ouro.jpg',
    alt: 'CASA Box Ouro aberta, com camiseta, cartão de founding member, adesivos e chaveiro.',
    description:
      'A experiência completa, com personalização, itens exclusivos e benefícios de founding member.',
    featured: true,
    foundingLabel: 'Founding Member',
  },
]

// Options for the pre-order form's tier select (no prices).
export const tierOptions = [
  { value: '', label: 'Ainda não sei' },
  { value: 'bronze', label: 'Bronze' },
  { value: 'prata', label: 'Prata' },
  { value: 'ouro', label: 'Ouro / Founding Member' },
]

// ── Pocket CASA (#pocket-casa) ────────────────────────────────────────────

export const pocketPoints = [
  'Dentro de um estúdio de detailing em operação.',
  'Base dos encontros e do conteúdo da comunidade.',
  'Um começo. A sede definitiva vem em outro momento.',
]

// ── Comunidade (#comunidade) — text-only by design, no photos ─────────────

export interface CommunityCell {
  label: string
  line: string
}

export const communityCells: CommunityCell[] = [
  { label: 'Grupo no WhatsApp', line: 'A conversa do clube, todo dia.' },
  { label: 'Encontros', line: 'Marcados pela própria comunidade, em Curitiba.' },
  { label: 'Vortex Detail', line: 'A parceria que abriga o Pocket CASA.' },
  { label: 'Instagram', line: 'O registro do que já aconteceu.' },
]

// ── App (#app) — unchanged from the current site ──────────────────────────

export const appFeatures = [
  'Acesso a eventos por QR code',
  'Planos de membership',
  'Perfil da sua garagem',
  'Ingressos de eventos',
  'Loja do clube',
  'Comunidade de membros',
  'Reservas de espaços',
]

// ── Visão Futura (#visao-futura) — concept renders only ───────────────────

export interface ConceptRender {
  image: string
  alt: string
  caption: string
}

export const conceptRenders: ConceptRender[] = [
  {
    image: '/assets/lp/sede-01.webp',
    alt: 'Imagem conceitual do exterior da futura sede da CASA CAR CLUB.',
    caption: 'Exterior',
  },
  {
    image: '/assets/lp/sede-02.webp',
    alt: 'Imagem conceitual do lounge da futura sede da CASA CAR CLUB.',
    caption: 'Lounge',
  },
  {
    image: '/assets/lp/sede-03.webp',
    alt: 'Imagem conceitual da garagem e área de mídia da futura sede da CASA CAR CLUB.',
    caption: 'Garagem e mídia',
  },
]

// ── Acesso Antecipado (#membros) ──────────────────────────────────────────

export const memberBenefits = [
  'Entra antes de todo mundo',
  'Preço de fundador (não volta)',
  'Prioridade nos encontros da comunidade',
  'Itens exclusivos de série limitada',
  'Acesso ao grupo fechado no WhatsApp',
]
