'use client';

import React from 'react';
import { Icon } from './Icon';

// ============================================================
// BUTTON
// ============================================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconLeft?: string;
  iconRight?: string;
  full?: boolean;
  loading?: boolean;
}

export function Button({ children, variant = 'primary', size = 'md', iconLeft, iconRight, full, loading, style, disabled, ...rest }: ButtonProps) {
  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: 13 },
    md: { padding: '10px 16px', fontSize: 14 },
    lg: { padding: '12px 20px', fontSize: 15 },
    xl: { padding: '14px 24px', fontSize: 16 },
  };
  const iconSizes: Record<string, number> = { sm: 13, md: 15, lg: 16, xl: 17 };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--primary)', color: 'var(--primary-ink)', border: '1px solid transparent' },
    outline: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--border-strong)' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid transparent' },
    danger: { background: 'var(--danger)', color: 'white', border: '1px solid transparent' },
  };
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderRadius: 'var(--r-md)', fontFamily: 'var(--font-sans)', fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
        transition: 'background .15s, border-color .15s, opacity .15s', letterSpacing: '-0.005em',
        opacity: disabled ? 0.5 : 1, width: full ? '100%' : undefined,
        ...sizes[size], ...variants[variant], ...style,
      }}
      {...rest}
    >
      {loading && <span style={{ width: iconSizes[size], height: iconSizes[size], border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'tvsl-spin .7s linear infinite', display: 'inline-block', flexShrink: 0 }}/>}
      {iconLeft && !loading && <Icon name={iconLeft} size={iconSizes[size]}/>}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSizes[size]}/>}
    </button>
  );
}

// ============================================================
// CARD
// ============================================================
interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  padding?: number;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}
export function Card({ children, style, padding = 20, hover, onClick, className }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding, boxShadow: 'var(--sh-xs)',
        cursor: onClick ? 'pointer' : undefined,
        transition: hover ? 'border-color .15s, box-shadow .15s, transform .15s' : undefined,
        ...style,
      }}
    >{children}</div>
  );
}

// ============================================================
// PILL / BADGE
// ============================================================
interface PillProps {
  children: React.ReactNode;
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
export function Pill({ children, tone = 'neutral', icon, size = 'md', style }: PillProps) {
  const toneMap: Record<string, React.CSSProperties> = {
    neutral: { background: 'var(--surface-3)', color: 'var(--ink-2)' },
    primary: { background: 'var(--primary-soft)', color: 'var(--primary-soft-ink)' },
    success: { background: 'var(--success-soft)', color: 'var(--success)' },
    warning: { background: 'var(--warning-soft)', color: 'oklch(0.55 0.12 65)' },
    danger: { background: 'var(--danger-soft)', color: 'var(--danger)' },
    info: { background: 'var(--info-soft)', color: 'var(--info)' },
    outline: { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border-strong)' },
  };
  const sizeMap: Record<string, React.CSSProperties> = {
    sm: { padding: '3px 8px', fontSize: 11 },
    md: { padding: '5px 10px', fontSize: 12 },
    lg: { padding: '7px 14px', fontSize: 13 },
  };
  const iconSize = { sm: 10, md: 11, lg: 13 }[size];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      borderRadius: 'var(--r-full)', fontWeight: 700, letterSpacing: '0.03em',
      fontFamily: 'var(--font-sans)', textTransform: 'uppercase',
      ...toneMap[tone], ...sizeMap[size], ...style,
    }}>
      {icon && <Icon name={icon} size={iconSize!}/>}
      {children}
    </span>
  );
}

// ============================================================
// AVATAR
// ============================================================
interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
  style?: React.CSSProperties;
}
export function Avatar({ name = '', src, size = 36, style }: AvatarProps) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const hue = name.split('').reduce((h, c) => h + c.charCodeAt(0), 0) % 360;
  if (src) return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, ...style }}/>;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `oklch(0.72 0.12 ${hue})`, color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, letterSpacing: '-0.02em', ...style,
    }}>{initials}</div>
  );
}

// ============================================================
// INPUT
// ============================================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  icon?: string;
  error?: string;
  containerStyle?: React.CSSProperties;
}
export function Input({ label, hint, icon, error, containerStyle, style, ...rest }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...containerStyle }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', display: 'flex' }}><Icon name={icon} size={15}/></span>}
        <input style={{
          width: '100%', padding: `10px ${icon ? '12px 10px 32px' : '12px'}`,
          background: 'var(--surface)', border: `1px solid ${error ? 'var(--danger)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--r-md)', fontSize: 14, outline: 'none', color: 'var(--ink)',
          transition: 'border-color .15s', paddingLeft: icon ? 32 : 12,
          ...style,
        }} {...rest}/>
      </div>
      {(hint || error) && <span style={{ fontSize: 12, color: error ? 'var(--danger)' : 'var(--muted)' }}>{error || hint}</span>}
    </div>
  );
}

// ============================================================
// TEXTAREA
// ============================================================
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}
export function Textarea({ label, hint, style, ...rest }: TextareaProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</label>}
      <textarea style={{
        width: '100%', padding: '10px 12px', background: 'var(--surface)',
        border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)',
        fontSize: 14, outline: 'none', color: 'var(--ink)', resize: 'vertical', lineHeight: 1.5,
        ...style,
      }} {...rest}/>
      {hint && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{hint}</span>}
    </div>
  );
}

// ============================================================
// SELECT
// ============================================================
interface SelectProps {
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (v: string) => void;
  style?: React.CSSProperties;
}
export function Select({ label, options, value, onChange, style }: SelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</label>}
      <select value={value} onChange={e => onChange?.(e.target.value)} style={{
        width: '100%', padding: '10px 12px', background: 'var(--surface)',
        border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)',
        fontSize: 14, outline: 'none', color: 'var(--ink)', ...style,
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================
interface StatProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'success' | 'danger';
  icon?: string;
  sublabel?: string;
}
export function Stat({ label, value, delta, deltaTone = 'success', icon, sublabel }: StatProps) {
  return (
    <Card padding={20}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{label}</span>
        {icon && <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={15}/></div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1 }}>{value}</span>
        {delta && <span style={{ fontSize: 12, fontWeight: 700, color: `var(--${deltaTone})` }}>{delta}</span>}
      </div>
      {sublabel && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{sublabel}</div>}
    </Card>
  );
}

// ============================================================
// LOGO
// ============================================================
export function Logo({ size = 28, label = 'TVSL', color = 'var(--ink)' }: { size?: number; label?: string; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="var(--primary)"/>
        <path d="M8 10h16M8 16h10M8 22h13" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="22" cy="22" r="4" fill="white" opacity="0.9"/>
      </svg>
      <span style={{ fontWeight: 800, fontSize: size * 0.6, letterSpacing: '-0.02em', color }}>{label}</span>
    </div>
  );
}
