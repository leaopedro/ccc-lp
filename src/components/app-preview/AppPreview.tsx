import { useState } from 'react'
import Icon from './Icon'
import { GOLD, CREAM, dim, type Screen, type AppNav } from './types'
import {
  HomeScreen,
  EventScreen,
  MembershipScreen,
  CardScreen,
  CommunityScreen,
  GarageScreen,
} from './screens'

/**
 * Interactive member-app prototype: a phone frame wrapping a swappable screen
 * body and a persistent tab bar. Rendered at real size (390×844 in a 414-wide
 * bezel); the landing embed scales the whole thing down.
 */
export default function AppPreview() {
  const [screen, setScreen] = useState<Screen>('home')
  const [booked, setBooked] = useState(false)

  const nav: AppNav = {
    go: setScreen,
    booked,
    toggleBooked: () => setBooked((b) => !b),
  }

  // Active tab derives from the current screen (event lives under Início,
  // card under Perfil).
  const activeTab =
    screen === 'home' || screen === 'event'
      ? 'inicio'
      : screen === 'community'
        ? 'comunidade'
        : screen === 'garage'
          ? 'garagem'
          : 'perfil'

  const showTabBar = screen !== 'card'

  const tab = (key: string, icon: string, text: string, target: Screen) => {
    const color = activeTab === key ? GOLD : dim(0.42)
    return (
      <div
        onClick={() => setScreen(target)}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, paddingTop: 11, cursor: 'pointer' }}
      >
        <Icon name={icon} size={23} color={color} />
        <span style={{ fontSize: 9.5, color }}>{text}</span>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* Phone bezel */}
      <div
        style={{
          width: 414,
          background: 'linear-gradient(150deg,#48484e,#141416 42%,#08080a)',
          borderRadius: 62,
          padding: 12,
          boxShadow: '0 44px 90px -30px rgba(0,0,0,.9), inset 0 0 0 1.6px rgba(255,255,255,.06)',
        }}
      >
        <div
          style={{
            width: 390,
            height: 844,
            background: '#0A0A0A',
            borderRadius: 50,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: 'absolute',
              top: 13,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 116,
              height: 33,
              background: '#000',
              borderRadius: 18,
              zIndex: 80,
            }}
          />

          {/* Status bar */}
          <div
            style={{
              height: 54,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 32px 8px',
              zIndex: 70,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: CREAM }}>9:41</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center', color: CREAM }}>
              <Icon name="signal_cellular_alt" size={17} />
              <Icon name="wifi" size={17} />
              <Icon name="battery_full" size={18} />
            </span>
          </div>

          {/* Screen body */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {screen === 'home' && <HomeScreen nav={nav} />}
            {screen === 'event' && <EventScreen nav={nav} />}
            {screen === 'membership' && <MembershipScreen nav={nav} />}
            {screen === 'card' && <CardScreen nav={nav} />}
            {screen === 'community' && <CommunityScreen />}
            {screen === 'garage' && <GarageScreen />}
          </div>

          {/* Tab bar */}
          {showTabBar && (
            <div
              style={{
                flexShrink: 0,
                height: 74,
                borderTop: '1px solid rgba(212,175,55,.12)',
                background: '#0C0B09',
                display: 'flex',
                padding: '0 10px 16px',
              }}
            >
              {tab('inicio', 'home', 'Início', 'home')}
              {tab('comunidade', 'groups', 'Comunidade', 'community')}
              {tab('garagem', 'directions_car', 'Garagem', 'garage')}
              {tab('perfil', 'person', 'Perfil', 'membership')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
