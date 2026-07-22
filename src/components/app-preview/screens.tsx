import type { CSSProperties, ReactNode } from 'react'
import Icon from './Icon'
import QrCode from './QrCode'
import { GOLD, CREAM, GOLD_CTA, dim, type AppNav } from './types'

// Shared assets. Interior/hero images are reused from the main /assets folder;
// app-only art (lockup, badge, member cars) lives under /assets/app.
const IMG = {
  lockup: '/assets/app/lockup-cream.png',
  badge: '/assets/app/badge-gold.png',
  hero: '/assets/hero-house.webp',
  event: '/assets/event-hall.webp',
  media: '/assets/media-hub.webp',
  barCafe: '/assets/bar-cafe.webp',
  carGtr: '/assets/app/car-gtr.png',
  carM3: '/assets/app/car-m3.png',
}

const scr: CSSProperties = {
  position: 'absolute',
  inset: 0,
  overflowY: 'auto',
  animation: 'ccScreenIn .32s ease both',
}

const label: CSSProperties = {
  fontSize: 9.5,
  fontWeight: 500,
  letterSpacing: '.2em',
  color: GOLD,
}

// ── Início ────────────────────────────────────────────────────────────────
export function HomeScreen({ nav }: { nav: AppNav }) {
  const quickTile = (icon: string, text: string, onClick?: () => void) => (
    <div
      onClick={onClick}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: '#15120B',
          border: '1px solid rgba(212,175,55,.15)',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={23} color={GOLD} />
      </div>
      <span style={{ fontSize: 10, color: dim(0.6) }}>{text}</span>
    </div>
  )

  const stat = (icon: string, name: string, value: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
      <Icon name={icon} size={22} color={GOLD} />
      <span style={{ fontSize: 8.5, letterSpacing: '.14em', color: dim(0.45) }}>{name}</span>
      <span style={{ fontSize: 18, fontWeight: 600, color: CREAM }}>{value}</span>
    </div>
  )

  return (
    <div className="app-scr" style={scr}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 22px 12px' }}>
        <img src={IMG.lockup} alt="Casa Car Club" style={{ height: 26, width: 'auto', display: 'block' }} />
        <Icon name="notifications" size={24} color={GOLD} />
      </div>

      <div style={{ position: 'relative', margin: '0 16px', borderRadius: 20, overflow: 'hidden', height: 210 }}>
        <img
          src={IMG.hero}
          alt="Clube"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 58%', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,.94) 2%, rgba(10,10,10,.18) 56%, rgba(10,10,10,.42) 100%)',
          }}
        />
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.06, color: CREAM, letterSpacing: '.01em' }}>
            DIRIGIR.
            <br />
            CONECTAR.
            <br />
            PERTENCER.
          </div>
          <div style={{ width: 40, height: 3, background: GOLD, marginTop: 12, borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ padding: '16px 22px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.16em', color: CREAM }}>BEM-VINDO DE VOLTA, PEDRO</div>
        <div style={{ fontSize: 10, letterSpacing: '.2em', color: dim(0.42), marginTop: 5 }}>MEMBRO #0001</div>
      </div>

      <div
        onClick={() => nav.go('event')}
        style={{
          margin: '14px 16px 0',
          background: '#15120B',
          border: '1px solid rgba(212,175,55,.2)',
          borderRadius: 17,
          padding: 15,
          cursor: 'pointer',
        }}
      >
        <div style={{ ...label, marginBottom: 10 }}>PRÓXIMO EVENTO</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: CREAM }}>Sunset Meet &amp; Drive</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 9 }}>
              <Icon name="calendar_today" size={14} color={GOLD} />
              <span style={{ fontSize: 12, color: dim(0.6) }}>25 Mai 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6 }}>
              <Icon name="schedule" size={14} color={GOLD} />
              <span style={{ fontSize: 12, color: dim(0.6) }}>17:00</span>
            </div>
          </div>
          <img
            src={IMG.event}
            alt="evento"
            style={{ width: 74, height: 74, objectFit: 'cover', objectPosition: '72% 42%', borderRadius: 12, display: 'block' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 11 }}>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '.14em',
              color: '#0A0A0A',
              background: GOLD_CTA,
              padding: '8px 16px',
              borderRadius: 9,
            }}
          >
            VER EVENTO
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ ...label, marginBottom: 12 }}>STATUS DO CLUBE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {stat('groups', 'MEMBROS', '128')}
          {stat('calendar_month', 'EVENTOS', '6')}
          {stat('directions_car', 'GARAGEM', '18')}
        </div>
      </div>

      <div style={{ padding: '20px 20px 26px' }}>
        <div style={{ ...label, marginBottom: 12 }}>ACESSO RÁPIDO</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {quickTile('event', 'Eventos', () => nav.go('event'))}
          {quickTile('confirmation_number', 'Reservas')}
          {quickTile('directions_car', 'Garagem', () => nav.go('garage'))}
          {quickTile('favorite', 'Benefícios', () => nav.go('membership'))}
        </div>
      </div>
    </div>
  )
}

// ── Evento ──────────────────────────────────────────────────────────────
export function EventScreen({ nav }: { nav: AppNav }) {
  const expect = (icon: string, text: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Icon name={icon} size={19} color={GOLD} />
      <span style={{ fontSize: 13, color: dim(0.75) }}>{text}</span>
    </div>
  )

  return (
    <div className="app-scr" style={{ ...scr, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px 22px 12px',
        }}
      >
        <span onClick={() => nav.go('home')} style={{ cursor: 'pointer' }}>
          <Icon name="arrow_back_ios_new" size={22} color={CREAM} />
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.2em', color: CREAM }}>DETALHES DO EVENTO</span>
        <Icon name="ios_share" size={21} color={GOLD} />
      </div>

      <div className="app-scr" style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ position: 'relative', margin: '2px 16px 0', borderRadius: 18, overflow: 'hidden', height: 184 }}>
          <img
            src={IMG.event}
            alt="evento"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '72% 40%', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,.55), rgba(10,10,10,0) 45%)',
            }}
          />
        </div>
        <div style={{ padding: '16px 22px 20px' }}>
          <div style={label}>PRÓXIMO EVENTO</div>
          <div style={{ fontSize: 23, fontWeight: 700, letterSpacing: '.01em', color: CREAM, marginTop: 7 }}>
            SUNSET MEET &amp; DRIVE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 11 }}>
            <Icon name="location_on" size={16} color={GOLD} />
            <span style={{ fontSize: 12, letterSpacing: '.06em', color: dim(0.6) }}>CASA CAR CLUB CURITIBA</span>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="calendar_today" size={16} color={GOLD} />
              <span style={{ fontSize: 12, color: dim(0.6) }}>25 Mai 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="schedule" size={16} color={GOLD} />
              <span style={{ fontSize: 12, color: dim(0.6) }}>17:00 – 22:00</span>
            </div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.65, color: dim(0.62), marginTop: 15 }}>
            Uma noite exclusiva para os membros. Ótimos carros, boas companhias e momentos inesquecíveis.
          </div>
          <div style={{ ...label, marginTop: 20 }}>O QUE ESPERAR</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {expect('directions_car', 'Passeio panorâmico')}
            {expect('outdoor_grill', 'Churrasco & Drinks')}
            {expect('star', 'Exposição de carros')}
            {expect('music_note', 'Música ao vivo')}
          </div>
          <div style={{ ...label, marginTop: 19 }}>VAGAS RESTANTES</div>
          <div style={{ marginTop: 6 }}>
            <span style={{ fontSize: 20, fontWeight: 600, color: GOLD }}>32</span>
            <span style={{ fontSize: 15, color: dim(0.4) }}> / 60</span>
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '10px 20px 16px' }}>
        <div
          onClick={nav.toggleBooked}
          style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '.16em',
            color: '#0A0A0A',
            background: GOLD_CTA,
            padding: 15,
            borderRadius: 13,
            cursor: 'pointer',
          }}
        >
          {nav.booked ? 'VAGA RESERVADA ✓' : 'RESERVAR SUA VAGA'}
        </div>
      </div>
    </div>
  )
}

// ── Associação (Perfil) ─────────────────────────────────────────────────
export function MembershipScreen({ nav }: { nav: AppNav }) {
  const benefit = (icon: string, title: string, sub: string, last = false) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: '13px 15px',
        borderBottom: last ? 'none' : '1px solid rgba(212,175,55,.08)',
      }}
    >
      <Icon name={icon} size={20} color={GOLD} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: CREAM }}>{title}</div>
        <div style={{ fontSize: 10.5, color: dim(0.45), marginTop: 2 }}>{sub}</div>
      </div>
      <Icon name="chevron_right" size={18} color={dim(0.35)} />
    </div>
  )

  const activity = (img: string, title: string, date: string) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 0',
        borderBottom: '1px solid rgba(212,175,55,.08)',
        marginTop: 5,
      }}
    >
      <img src={img} alt="" style={{ width: 44, height: 44, objectFit: 'cover', objectPosition: '50% 60%', borderRadius: 10, display: 'block' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: CREAM }}>{title}</div>
        <div style={{ fontSize: 10.5, color: dim(0.45), marginTop: 2 }}>{date}</div>
      </div>
      <Icon name="chevron_right" size={18} color={dim(0.35)} />
    </div>
  )

  return (
    <div className="app-scr" style={scr}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 24px 14px' }}>
        <span style={{ width: 22 }} />
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.22em', color: CREAM }}>ASSOCIAÇÃO</span>
        <Icon name="settings" size={22} color={GOLD} />
      </div>

      <div
        onClick={() => nav.go('card')}
        style={{
          margin: '2px 20px 0',
          position: 'relative',
          borderRadius: 18,
          padding: '20px 22px',
          background: 'radial-gradient(130% 100% at 80% 10%, #241f13 0%, #0d0b07 55%, #14110a 100%)',
          border: '1px solid rgba(212,175,55,.38)',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '.16em', color: dim(0.5) }}>MEMBRO</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: GOLD, marginTop: 4 }}>#0001</div>
          </div>
          <img src={IMG.badge} alt="CCC" style={{ width: 96, height: 96, objectFit: 'contain', display: 'block' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, letterSpacing: '.16em', color: dim(0.5) }}>DESDE</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: GOLD, marginTop: 4 }}>2026</div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(212,175,55,.2)', margin: '16px 0 11px' }} />
        <div style={{ textAlign: 'center', fontSize: 9, fontWeight: 500, letterSpacing: '.3em', color: GOLD }}>
          DIRIGIR · CONECTAR · PERTENCER
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '17px 0 2px' }}>
        <div style={{ fontSize: 9.5, letterSpacing: '.24em', color: dim(0.45) }}>NÍVEL</div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: '.02em',
            color: GOLD,
            marginTop: 4,
          }}
        >
          MEMBRO FUNDADOR
        </div>
        <div style={{ fontSize: 11, color: dim(0.5), marginTop: 6 }}>Válido até 31/12/2026</div>
      </div>

      <div style={{ margin: '16px 20px 0' }}>
        <div style={label}>SEUS BENEFÍCIOS</div>
        <div
          style={{
            marginTop: 11,
            background: '#100E09',
            border: '1px solid rgba(212,175,55,.12)',
            borderRadius: 15,
            overflow: 'hidden',
          }}
        >
          {benefit('schedule', 'Acesso ao Clube', '24 horas')}
          {benefit('event_available', 'Prioridade em Eventos', 'Acesso exclusivo')}
          {benefit('sell', 'Descontos para Membros', '15+ parceiros')}
          {benefit('group_add', 'Convidados', 'Traga até 3 convidados', true)}
        </div>
      </div>

      <div style={{ margin: '16px 20px 24px' }}>
        <div style={label}>ATIVIDADE RECENTE</div>
        {activity(IMG.media, 'Track Day Curitiba', '10 Mai 2026')}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0' }}>
          <img src={IMG.barCafe} alt="" style={{ width: 44, height: 44, objectFit: 'cover', objectPosition: '60% 60%', borderRadius: 10, display: 'block' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: CREAM }}>Sessão de Detailing</div>
            <div style={{ fontSize: 10.5, color: dim(0.45), marginTop: 2 }}>02 Mai 2026</div>
          </div>
          <Icon name="chevron_right" size={18} color={dim(0.35)} />
        </div>
      </div>
    </div>
  )
}

// ── Carteirinha ─────────────────────────────────────────────────────────
export function CardScreen({ nav }: { nav: AppNav }) {
  return (
    <div className="app-scr" style={scr}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 24px 12px' }}>
        <span onClick={() => nav.go('membership')} style={{ cursor: 'pointer' }}>
          <Icon name="close" size={23} color={CREAM} />
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.2em', color: CREAM }}>CARTEIRINHA</span>
        <Icon name="more_horiz" size={23} color={GOLD} />
      </div>
      <div style={{ padding: '12px 24px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: '100%',
            position: 'relative',
            borderRadius: 22,
            padding: '34px 26px',
            background: 'radial-gradient(130% 100% at 75% 12%, #241f13 0%, #0c0a06 58%, #15120a 100%)',
            border: '1px solid rgba(212,175,55,.45)',
          }}
        >
          <div style={{ position: 'absolute', inset: 9, border: '1px solid rgba(212,175,55,.22)', borderRadius: 15, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={IMG.badge} alt="CCC" style={{ width: 170, height: 170, objectFit: 'contain', display: 'block' }} />
          </div>
          <div style={{ height: 1, background: 'rgba(212,175,55,.22)', margin: '20px 8px 14px' }} />
          <div style={{ textAlign: 'center', fontSize: 9, fontWeight: 500, letterSpacing: '.32em', color: GOLD }}>
            DIRIGIR · CONECTAR · PERTENCER
          </div>
        </div>

        <div style={{ width: 150, height: 150, background: '#F4EFE4', borderRadius: 18, padding: 13, marginTop: 28 }}>
          <QrCode />
        </div>

        <div style={{ fontSize: 10, letterSpacing: '.22em', color: dim(0.5), marginTop: 22 }}>MEMBRO</div>
        <div style={{ fontSize: 24, fontWeight: 600, color: GOLD, marginTop: 5 }}>#0001</div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: '.03em',
            color: CREAM,
            marginTop: 11,
          }}
        >
          MEMBRO FUNDADOR
        </div>
        <div style={{ fontSize: 11, letterSpacing: '.16em', color: dim(0.5), marginTop: 6 }}>DESDE 2026</div>
        <div style={{ fontSize: 12, lineHeight: 1.6, color: dim(0.5), textAlign: 'center', marginTop: 18, maxWidth: 250 }}>
          Apresente esta carteirinha para acessar o clube e os benefícios de membro.
        </div>
      </div>
    </div>
  )
}

// ── Comunidade ──────────────────────────────────────────────────────────
export function CommunityScreen() {
  const post = (
    initial: string,
    avatarBg: string,
    initialColor: string,
    name: string,
    meta: string,
    img: string,
    caption: string,
    likes: number,
    comments: number,
  ) => (
    <div style={{ background: '#0F0E0B', border: '1px solid rgba(212,175,55,.12)', borderRadius: 18, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 15px' }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: avatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 16,
            color: initialColor,
          }}
        >
          {initial}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: CREAM }}>{name}</div>
          <div style={{ fontSize: 10, color: dim(0.42), marginTop: 2 }}>{meta}</div>
        </div>
        <Icon name="more_horiz" size={19} color={dim(0.35)} />
      </div>
      <img src={img} alt="" style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: '50% 55%', display: 'block' }} />
      <div style={{ padding: '12px 15px 14px' }}>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: dim(0.78) }}>{caption}</div>
        <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: GOLD }}>
            <Icon name="favorite" size={17} />
            {likes}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: dim(0.55) }}>
            <Icon name="chat_bubble" size={17} />
            {comments}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-scr" style={scr}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 22px 14px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.22em', color: CREAM }}>COMUNIDADE</span>
        <Icon name="add_circle" size={22} color={GOLD} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 16px 24px' }}>
        {post('R', GOLD_CTA, '#0A0A0A', 'Rafael Menezes', 'há 2 horas · Track Day', IMG.media, 'Dia incrível no Track Day de Curitiba com a família CCC. Já com saudade! 🏁', 48, 12)}
        {post('A', 'linear-gradient(135deg,#3a3730,#1a1712)', GOLD, 'Ana Furlan', 'ontem · Café & Club', IMG.barCafe, 'O melhor espresso da cidade fica aqui no clube. Bora marcar? ☕', 31, 7)}
      </div>
    </div>
  )
}

// ── Garagem ─────────────────────────────────────────────────────────────
export function GarageScreen() {
  const chip = (text: string, highlight = false) => (
    <span
      style={{
        fontSize: 10,
        letterSpacing: '.1em',
        color: highlight ? GOLD : dim(0.6),
        background: '#15120B',
        border: `1px solid rgba(212,175,55,${highlight ? '.2' : '.12'})`,
        padding: '5px 11px',
        borderRadius: 8,
      }}
    >
      {text}
    </span>
  )

  const car = (img: string, name: string, spec: string, chips: ReactNode) => (
    <div style={{ background: '#0F0E0B', border: '1px solid rgba(212,175,55,.14)', borderRadius: 18, overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: 184 }}>
        <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: CREAM }}>{name}</div>
        <div style={{ fontSize: 11, letterSpacing: '.06em', color: dim(0.5), marginTop: 4 }}>{spec}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>{chips}</div>
      </div>
    </div>
  )

  return (
    <div className="app-scr" style={scr}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 22px 14px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.22em', color: CREAM }}>MINHA GARAGEM</span>
        <Icon name="add_circle" size={22} color={GOLD} />
      </div>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 11, color: dim(0.5), lineHeight: 1.5, padding: '0 4px' }}>
          Os veículos que você adiciona ao seu perfil de membro.
        </div>

        {car(IMG.carGtr, 'Nissan GTR', '2013 · Preto Metálico', (
          <>
            {chip('DESTAQUE', true)}
            {chip('545 CV')}
          </>
        ))}

        {car(IMG.carM3, 'BMW M3 E36', '1997 · Preto', (
          <>
            {chip('CLÁSSICO', true)}
            {chip('321 CV')}
          </>
        ))}

        <div
          style={{
            border: '1px dashed rgba(212,175,55,.3)',
            borderRadius: 18,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
        >
          <Icon name="add" size={26} color={GOLD} />
          <span style={{ fontSize: 12, letterSpacing: '.1em', color: dim(0.6) }}>Adicionar veículo</span>
        </div>
      </div>
    </div>
  )
}
