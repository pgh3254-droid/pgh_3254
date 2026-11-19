import { useState } from 'react';
import {
  CanonicalEra,
  ERA_IMAGES,
  VisualMotif,
} from '../data/visualCardsData';

interface MotifDiagramProps {
  motif: VisualMotif;
  className?: string;
}

export function MotifDiagramSvg({ motif, className = 'w-full h-32' }: MotifDiagramProps) {
  switch (motif) {
    case 'creation':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#172554" />
          <path d="M0 78 Q70 68 140 78 T280 78 L280 120 L0 120 Z" fill="#1E3A8A" opacity="0.7" />
          <path d="M0 90 Q70 82 140 90 T280 90 L280 120 L0 120 Z" fill="#0F172A" opacity="0.6" />
          <circle cx="140" cy="54" r="34" fill="#FDE68A" opacity="0.16" />
          <circle cx="140" cy="54" r="22" fill="#FCD34D" opacity="0.35" />
          <circle cx="140" cy="54" r="12" fill="#FEF3C7" />
          <g stroke="#FDE68A" strokeWidth="1.2" opacity="0.7">
            <line x1="140" y1="12" x2="140" y2="24" />
            <line x1="100" y1="22" x2="110" y2="30" />
            <line x1="180" y1="22" x2="170" y2="30" />
            <line x1="88" y1="54" x2="104" y2="54" />
            <line x1="176" y1="54" x2="192" y2="54" />
          </g>
          <circle cx="52" cy="24" r="1.5" fill="#F8FAFC" />
          <circle cx="222" cy="20" r="1.8" fill="#F8FAFC" />
          <circle cx="240" cy="40" r="1.2" fill="#F8FAFC" />
        </svg>
      );
    case 'eden':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#ECFDF5" />
          <path d="M140 105 C115 105 95 95 60 116 M140 105 C165 105 185 95 220 116 M140 105 C132 95 110 85 45 92 M140 105 C148 95 170 85 235 92" stroke="#0284C7" strokeWidth="2.2" fill="none" opacity="0.55" />
          <rect x="135" y="55" width="10" height="45" rx="2" fill="#78350F" />
          <circle cx="140" cy="42" r="28" fill="#15803D" opacity="0.88" />
          <circle cx="122" cy="46" r="16" fill="#166534" opacity="0.85" />
          <circle cx="158" cy="46" r="16" fill="#16A34A" opacity="0.85" />
          <circle cx="132" cy="36" r="3" fill="#FDE047" />
          <circle cx="149" cy="44" r="3" fill="#FDE047" />
          <circle cx="140" cy="28" r="3" fill="#FDE047" />
        </svg>
      );
    case 'flood':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#EFF6FF" />
          <path d="M40 94 A100 72 0 0 1 240 94" stroke="#DC2626" strokeWidth="3.5" fill="none" opacity="0.7" />
          <path d="M48 94 A92 64 0 0 1 232 94" stroke="#D97706" strokeWidth="3.5" fill="none" opacity="0.75" />
          <path d="M56 94 A84 56 0 0 1 224 94" stroke="#059669" strokeWidth="3.5" fill="none" opacity="0.7" />
          <path d="M64 94 A76 48 0 0 1 216 94" stroke="#1D4ED8" strokeWidth="3.5" fill="none" opacity="0.7" />
          <path d="M98 74 L182 74 L172 94 L108 94 Z" fill="#78350F" />
          <rect x="114" y="62" width="52" height="12" fill="#92400E" />
          <path d="M0 96 Q35 88 70 96 T140 96 T210 96 T280 96 L280 120 L0 120 Z" fill="#1E40AF" opacity="0.8" />
        </svg>
      );
    case 'tower':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#F5F5F4" />
          <rect x="92" y="90" width="96" height="18" rx="2" fill="#78716C" />
          <rect x="104" y="70" width="72" height="18" rx="2" fill="#57534E" />
          <rect x="116" y="50" width="48" height="18" rx="2" fill="#44403C" />
          <rect x="128" y="30" width="24" height="18" rx="2" fill="#292524" />
          <path d="M90 48 L40 24 M190 48 L240 24 M80 76 L26 76 M200 76 L254 76" stroke="#9A3412" strokeWidth="1.6" strokeDasharray="4 3" />
        </svg>
      );
    case 'covenant':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#1C1917" />
          <circle cx="52" cy="24" r="1.5" fill="#FDE68A" />
          <circle cx="96" cy="18" r="1.8" fill="#FDE68A" />
          <circle cx="148" cy="14" r="2" fill="#FDE68A" />
          <circle cx="195" cy="22" r="1.6" fill="#FDE68A" />
          <circle cx="235" cy="30" r="1.4" fill="#FDE68A" />
          <path d="M90 92 Q140 50 190 92" stroke="#D97706" strokeWidth="2.5" fill="none" />
          <circle cx="140" cy="68" r="10" fill="#F59E0B" opacity="0.85" />
          <circle cx="140" cy="68" r="20" fill="#F59E0B" opacity="0.2" />
          <line x1="65" y1="96" x2="215" y2="96" stroke="#A8A29E" strokeWidth="1.5" />
        </svg>
      );
    case 'exodus':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#FEF3C7" />
          <path d="M0 110 L0 32 Q55 32 95 72 L95 110 Z" fill="#1D4ED8" opacity="0.82" />
          <path d="M280 110 L280 32 Q225 32 185 72 L185 110 Z" fill="#1D4ED8" opacity="0.82" />
          <rect x="95" y="72" width="90" height="48" fill="#E7E5E4" />
          <path d="M140 16 L140 72" stroke="#D97706" strokeWidth="8" strokeLinecap="round" opacity="0.45" />
          <circle cx="140" cy="24" r="10" fill="#F59E0B" />
        </svg>
      );
    case 'law':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#F4F0E8" />
          <path d="M84 36 A26 22 0 0 1 136 36 L136 96 L84 96 Z" fill="#FFFFFF" stroke="#57534E" strokeWidth="2" />
          <path d="M144 36 A26 22 0 0 1 196 36 L196 96 L144 96 Z" fill="#FFFFFF" stroke="#57534E" strokeWidth="2" />
          <g stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round">
            <line x1="96" y1="44" x2="124" y2="44" />
            <line x1="96" y1="56" x2="124" y2="56" />
            <line x1="96" y1="68" x2="124" y2="68" />
            <line x1="96" y1="80" x2="118" y2="80" />
            <line x1="156" y1="44" x2="184" y2="44" />
            <line x1="156" y1="56" x2="184" y2="56" />
            <line x1="156" y1="68" x2="184" y2="68" />
            <line x1="156" y1="80" x2="184" y2="80" />
          </g>
        </svg>
      );
    case 'tabernacle':
    case 'temple':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#F5F2EB" />
          <rect x="44" y="20" width="192" height="80" rx="4" fill="none" stroke="#78350F" strokeWidth="2" strokeDasharray="5 3" />
          <rect x="108" y="34" width="108" height="52" rx="2" fill="#FFFBEB" stroke="#B45309" strokeWidth="2" />
          <rect x="170" y="34" width="46" height="52" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="74" cy="60" r="10" fill="#DC2626" opacity="0.75" />
          <circle cx="193" cy="60" r="8" fill="#D97706" />
        </svg>
      );
    case 'cross':
    case 'resurrection':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#1E293B" />
          <circle cx="140" cy="54" r="42" fill="#FDE68A" opacity="0.14" />
          <circle cx="140" cy="54" r="26" fill="#FDE68A" opacity="0.24" />
          <rect x="135" y="22" width="10" height="74" rx="2" fill="#F8FAFC" />
          <rect x="114" y="42" width="52" height="10" rx="2" fill="#F8FAFC" />
        </svg>
      );
    case 'newCreation':
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#EFF6FF" />
          <circle cx="140" cy="40" r="24" fill="#FDE68A" opacity="0.65" />
          <rect x="98" y="34" width="84" height="34" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
          <path d="M140 68 C130 85 110 95 75 118 L205 118 C170 95 150 85 140 68 Z" fill="#0284C7" opacity="0.45" />
          <circle cx="110" cy="84" r="9" fill="#15803D" opacity="0.85" />
          <circle cx="170" cy="84" r="9" fill="#15803D" opacity="0.85" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 280 120" className={className} aria-hidden="true">
          <rect width="280" height="120" rx="8" fill="#F4F0E8" />
          <rect x="70" y="26" width="140" height="68" rx="6" fill="#FFFFFF" stroke="#A8A29E" strokeWidth="1.5" />
          <circle cx="70" cy="60" r="10" fill="#E7E5E4" stroke="#78716C" strokeWidth="1.5" />
          <circle cx="210" cy="60" r="10" fill="#E7E5E4" stroke="#78716C" strokeWidth="1.5" />
          <line x1="92" y1="46" x2="188" y2="46" stroke="#1E3A8A" strokeWidth="2" opacity="0.7" />
          <line x1="92" y1="60" x2="176" y2="60" stroke="#78716C" strokeWidth="1.8" opacity="0.7" />
          <line x1="92" y1="74" x2="164" y2="74" stroke="#78716C" strokeWidth="1.8" opacity="0.5" />
        </svg>
      );
  }
}

interface EraArtworkProps {
  era: CanonicalEra;
  motif: VisualMotif;
  caption: string;
}

export function EraArtworkBanner({ era, motif, caption }: EraArtworkProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const info = ERA_IMAGES[era];

  if (imgFailed) {
    return (
      <div className="rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
        <MotifDiagramSvg motif={motif} className="w-full h-36" />
        <p className="px-3 py-1.5 text-[11px] text-stone-600 dark:text-stone-400">
          {caption}
        </p>
      </div>
    );
  }

  return (
    <figure className="rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
      <div className="relative h-36 overflow-hidden">
        <img
          src={info.src}
          alt={info.alt}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
        />
        <figcaption className="absolute bottom-2 left-3 right-3 text-[11px] font-medium text-white leading-snug">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
