/**
 * On-brand illustrations built from the logo's rounded "figure" shapes.
 * They are placeholders for real, licensed photography: every slot that uses
 * a scene also accepts an image (see ArchFrame). All scenes are decorative.
 * viewBox is portrait 400×500 to suit the arch frame.
 */

const C = {
  ink: "#0E2A3D",
  navy: "#0B4260",
  teal: "#278CA5",
  teal6: "#1C6F85",
  teal2: "#A9D3DE",
  orange: "#EA924A",
  orange1: "#FBE6D4",
  paper: "#F7F4EE",
  paperDeep: "#EFE9DF",
  mist: "#E3EEF1",
};

function body(x1: number, x2: number, top: number, bottom: number, r: number) {
  return `M${x1},${bottom} V${top + r} A${r},${r} 0 0 1 ${x1 + r},${top} H${x2 - r} A${r},${r} 0 0 1 ${x2},${top + r} V${bottom} Z`;
}

function Figure({ x, w, top, color, ground = 500 }: { x: number; w: number; top: number; color: string; ground?: number }) {
  const r = w / 2;
  const headR = w * 0.42;
  return (
    <g>
      <circle cx={x + r} cy={top - headR - w * 0.08} r={headR} fill={color} />
      <path d={body(x, x + w, top, ground, r * 0.82)} fill={color} />
    </g>
  );
}

type SceneProps = { className?: string };
const svgProps = {
  viewBox: "0 0 400 500",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true,
  focusable: false,
} as const;

/** Home hero: three figures in a warm doorway at sunrise. */
export function DoorwayScene({ className }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect width="400" height="500" fill={C.mist} />
      <circle cx="292" cy="148" r="86" fill={C.orange1} />
      <circle cx="292" cy="148" r="54" fill={C.orange} />
      <path d={body(78, 322, 150, 500, 122)} fill={C.paper} />
      <path d="M0 418 C 90 392 160 404 210 412 S 330 428 400 404 V500 H0Z" fill={C.teal2} />
      <Figure x={112} w={92} top={318} color={C.teal} />
      <Figure x={214} w={88} top={334} color={C.orange} />
      <Figure x={164} w={84} top={366} color={C.navy} />
    </svg>
  );
}

/** Accommodation: an open door, a key, warm light inside. */
export function DoorKeyScene({ className }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect width="400" height="500" fill={C.navy} />
      <g fill={C.paper} opacity="0.08">
        <rect x="36" y="70" width="60" height="70" rx="8" />
        <rect x="304" y="70" width="60" height="70" rx="8" />
        <rect x="36" y="168" width="60" height="70" rx="8" />
        <rect x="304" y="168" width="60" height="70" rx="8" />
      </g>
      <path d={body(120, 280, 150, 500, 80)} fill={C.orange} />
      <path d={body(120, 280, 150, 500, 80)} fill={C.orange1} opacity="0.35" />
      <path d="M120 230 Q 120 150 200 150 L 214 158 L 214 500 L 120 500 Z" fill={C.paper} />
      <circle cx="198" cy="340" r="7" fill={C.ink} />
      <g transform="translate(250 300) rotate(-28)">
        <circle cx="0" cy="0" r="34" fill="none" stroke={C.teal2} strokeWidth="16" />
        <rect x="30" y="-8" width="104" height="16" rx="8" fill={C.teal2} />
        <rect x="104" y="6" width="14" height="26" rx="5" fill={C.teal2} />
        <rect x="84" y="6" width="12" height="18" rx="5" fill={C.teal2} />
      </g>
      <rect x="0" y="470" width="400" height="30" fill={C.ink} opacity="0.35" />
    </svg>
  );
}

/** Employment & training: ascending steps, a figure near the top, a sprout at the base. */
export function StepsScene({ className }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect width="400" height="500" fill={C.paperDeep} />
      <circle cx="320" cy="96" r="44" fill={C.orange1} />
      <rect x="20" y="410" width="90" height="90" rx="10" fill={C.teal2} />
      <rect x="110" y="340" width="90" height="160" rx="10" fill={C.teal} />
      <rect x="200" y="270" width="90" height="230" rx="10" fill={C.navy} />
      <rect x="290" y="200" width="90" height="300" rx="10" fill={C.ink} />
      <Figure x={222} w={46} top={218} color={C.orange} ground={270} />
      <g transform="translate(64 410)">
        <path d="M0 0 V-46" stroke={C.teal6} strokeWidth="5" strokeLinecap="round" />
        <path d="M0 -28 C -26 -32 -34 -54 -30 -66 C -12 -60 -2 -46 0 -28Z" fill={C.teal6} />
        <path d="M0 -40 C 22 -46 32 -68 28 -80 C 10 -74 0 -60 0 -40Z" fill={C.teal} />
      </g>
    </svg>
  );
}

/** Advice & support: two overlapping conversation shapes and a listening figure. */
export function ConversationScene({ className }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect width="400" height="500" fill={C.paper} />
      <path d="M60 90 h170 a50 50 0 0 1 50 50 v70 a50 50 0 0 1 -50 50 h-110 l-40 36 v-36 h-20 a50 50 0 0 1 -50 -50 v-70 a50 50 0 0 1 50 -50z" fill={C.teal} />
      <path d="M180 200 h150 a46 46 0 0 1 46 46 v58 a46 46 0 0 1 -46 46 h-14 v34 l-38 -34 h-98 a46 46 0 0 1 -46 -46 v-58 a46 46 0 0 1 46 -46z" fill={C.orange} />
      <g fill={C.paper}>
        <circle cx="110" cy="176" r="9" />
        <circle cx="146" cy="176" r="9" />
        <circle cx="182" cy="176" r="9" />
      </g>
      <rect x="214" y="262" width="112" height="12" rx="6" fill={C.ink} opacity="0.55" />
      <rect x="214" y="290" width="74" height="12" rx="6" fill={C.ink} opacity="0.55" />
      <Figure x={66} w={72} top={420} color={C.navy} />
    </svg>
  );
}

/** About: a circle of support. */
export function CircleScene({ className }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect width="400" height="500" fill={C.ink} />
      <circle cx="200" cy="230" r="150" fill="none" stroke={C.paper} strokeOpacity="0.12" strokeWidth="2" strokeDasharray="4 10" />
      <circle cx="200" cy="230" r="96" fill={C.navy} />
      <circle cx="200" cy="80" r="30" fill={C.teal} />
      <circle cx="330" cy="305" r="30" fill={C.orange} />
      <circle cx="70" cy="305" r="30" fill={C.teal2} />
      <Figure x={162} w={76} top={262} color={C.orange} ground={326} />
      <path d="M0 420 C 120 396 280 396 400 420 V500 H0Z" fill={C.navy} />
    </svg>
  );
}

/** Referrals: a clear path with four stops. */
export function PathScene({ className }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect width="400" height="500" fill={C.paperDeep} />
      <path
        d="M70 440 C 70 360 330 380 330 300 S 70 240 70 160 S 300 90 330 60"
        fill="none"
        stroke={C.teal}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="2 16"
      />
      <circle cx="70" cy="440" r="22" fill={C.navy} />
      <circle cx="330" cy="300" r="22" fill={C.teal} />
      <circle cx="70" cy="160" r="22" fill={C.teal2} />
      <circle cx="330" cy="60" r="30" fill={C.orange} />
      <circle cx="330" cy="60" r="12" fill={C.paper} />
    </svg>
  );
}

/** Objectives: a house made of the three figures' colours. */
export function HouseScene({ className }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect width="400" height="500" fill={C.orange1} />
      <path d="M200 70 L360 210 V460 H40 V210 Z" fill={C.paper} />
      <path d="M200 70 L360 210 H40 Z" fill={C.navy} />
      <path d={body(160, 240, 330, 460, 40)} fill={C.teal} />
      <rect x="76" y="250" width="64" height="64" rx="10" fill={C.teal2} />
      <rect x="260" y="250" width="64" height="64" rx="10" fill={C.teal2} />
      <circle cx="200" cy="168" r="20" fill={C.orange} />
    </svg>
  );
}

export const scenes = {
  doorway: DoorwayScene,
  doorKey: DoorKeyScene,
  steps: StepsScene,
  conversation: ConversationScene,
  circle: CircleScene,
  path: PathScene,
  house: HouseScene,
};
export type SceneName = keyof typeof scenes;
