export interface FeatureCard {
  title: string
  description: string
  iconSvg: string
}

export const featureCards: FeatureCard[] = [
  {
    title: 'Lounge dos Membros',
    description: 'Sofás de couro, luz quente e um ambiente premium para relaxar e conectar.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2 13a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4H2z"/><path d="M4 17v2M20 17v2"/></svg>`,
  },
  {
    title: 'Eventos Automotivos',
    description: 'Encontros, track days e experiências exclusivas para a comunidade.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"/><path d="M5 4h12l-2.5 3.5L17 11H5"/></svg>`,
  },
  {
    title: 'Media Hub',
    description: 'Estúdio para criadores produzirem conteúdo automotivo de alto nível.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="14" height="11" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>`,
  },
  {
    title: 'Detailing Bay',
    description: 'Espaço dedicado ao cuidado, estética e proteção dos carros.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 5.5 6 9.5a6 6 0 0 1-12 0C6 8.5 12 3 12 3z"/></svg>`,
  },
  {
    title: 'Bar & Café',
    description: 'Café especial, drinks e petiscos em um ambiente sofisticado.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h12v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8z"/><path d="M17 9h2.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v2M11 3v2M14 3v2"/></svg>`,
  },
  {
    title: 'Simulador',
    description: 'Simulador de corrida profissional em tela grande, para pilotar sem sair da casa.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 14.5V21M9.6 11L3.5 8.5M14.4 11l6.1-2.5"/></svg>`,
  },
  {
    title: 'Área de Churrasco',
    description: 'Espaço externo para confraternizar entre amigos, boa comida e bons carros.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1.2 2.5 3.5 3.4 3.5 6.5a3.5 3.5 0 0 1-7 0c0-1.4.7-2.3 1.5-3 0 1.6 2 1.6 2 0 0-1.2 0-2.4 0-3.5z"/><path d="M5 21h14"/></svg>`,
  },
  {
    title: 'Ativações de Marca',
    description: 'Espaço para marcas se conectarem com uma comunidade automotiva qualificada.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.4 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z"/></svg>`,
  },
  {
    title: 'App da Comunidade',
    description: 'Eventos, reservas, ingressos e membership — tudo na palma da mão.',
    iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 18h2"/></svg>`,
  },
]

export const houseFeatures = [
  'Salão de eventos indoor',
  'Área externa e jardim',
  'Balcão de bar & café',
  'Área de churrasco',
  'Andar superior para mídia e reuniões',
]

export const memberBenefits = [
  'Acesso antecipado antes do lançamento público',
  'Preço especial de lançamento',
  'Prioridade em eventos e reservas',
  'Convite para os eventos preview',
  'Acesso ao grupo privado no WhatsApp',
]

export const appFeatures = [
  'Acesso a eventos por QR code',
  'Planos de membership',
  'Perfil da sua garagem',
  'Ingressos de eventos',
  'Loja do clube',
  'Comunidade de membros',
  'Reservas de espaços',
]

export const navLinks = [
  { href: '#conceito', label: 'Conceito' },
  { href: '#clube', label: 'O Clube' },
  { href: '#casa', label: 'A Casa' },
  { href: '#membros', label: 'Membros' },
  { href: '#app', label: 'App' },
]

export const footerLinks = {
  navegue: [
    { href: '#conceito', label: 'Conceito' },
    { href: '#clube', label: 'O Clube' },
    { href: '#casa', label: 'A Casa' },
    { href: '#membros', label: 'Membros' },
    { href: '#app', label: 'App' },
  ],
  conecte: [
    { href: '#waitlist', label: 'Lista de Espera' },
    { href: '/whatsapp', label: 'WhatsApp', external: true },
    { href: '/instagram', label: 'Instagram', external: true },
  ],
}
