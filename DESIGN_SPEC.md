# DESIGN_SPEC.md

Project: Fynn Gächter homelab portfolio
Identity: Y2K Chrome Futurism x Sci-Fi Computer Interface
Status: design specification, pre-implementation
Source of truth for homelab facts: `./opencode-homelab-handoff/`

---

## 0. Direction reconciliation (decision record)

Three documents define direction and they do not fully agree. This spec resolves the conflict and the resolution is final for implementation:

1. `DESIGN_CONSTITUTION.md` mandates chrome futurism x sci-fi computer interface. It wins on identity.
2. `WEBSITE_BRIEF.md` asks for dark technical editorial, restrained acid-green accent, and "avoid gradients". The dark graphite editorial base and the acid green are adopted. The gradient ban is narrowed: gradients are legal when they render a material (chrome, brushed aluminium, glass, acrylic, LCD) and illegal when they are decoration (purple color washes, glow headers, gradient buttons on flat backgrounds).
3. The previous draft (`index.html`, `style.css`, `script.js`) is treated as disposable. Its typography hierarchy may be reused; its acid-green accent survives only as the display phosphor defined below, not as a link/button accent.

Concrete posture: the site is a dark machined control console, not a glossy light-mode "web 2.0" page and not a neon cyberpunk page. Chrome is a text and material color; the page background is near-black blue-graphite; the only saturated color glow comes from status LEDs and LCD segments. It must look like front-machined hardware photographed in a dark room, lit from the top edge.

What this means in one sentence for every implementer: every panel is a physical object with light coming from above, every number is a display readout, every section boundary is a seam between two pieces of hardware.

---

## 1. Art direction and visual identity

### 1.1 Concept name

The site is "FACILITY OS 2005": a single-page control console for a private computing facility, as if a consumer hardware company in 2005 had shipped a home server appliance with a web admin panel, built today with real front-end capabilities.

Three physical metaphors govern ALL components:

1. **Machined front panel.** Headings are engraved or polished-metal nameplates. Section titles are Michroma set in a chrome gradient with a hard bottom edge highlight, like metal letters on a bezel.
2. **Backlit LCD/GLS module.** Numbers, tickers, metadata, and diagram labels sit on dark segmented LCD plates in phosphor green or amber mono type. These are the "screens" of the console.
3. **Bay and bezel system.** Content lives inside bays: recessed trays, raised chassis cards, port headers. Nothing is a floating rounded card. Everything is fastened into a chassis.

### 1.2 Lighting model (the single most important rule)

One imagined light source: top edge, slightly forward, cool white.

- Top edges of every raised surface catch light: a 1px top inset highlight, `rgba(255,255,255,0.10)` to `rgba(255,255,255,0.28)` depending on material.
- Bottom edges fall into shadow: a 1px inset dark line, `rgba(0,0,0,0.5)` minimum.
- Objects below other objects get a soft cast shadow: `0 10px 24px rgba(0,0,0,0.45)`.
- No bottom-up light. No rainbow rim light. No blur-haze glow behind panels.

### 1.3 Density rhythm

The console alternates three density zones deliberately, like real hardware shot composition:

- **Dense instrument rows** (LCD strips, LED banks, port grids): tight 8px rhythm.
- **Machine plates** (section titles, chassis headers): generous 32px internal padding, this is where the air lives.
- **Service bays** (content cards): 24px padding rhythm, uniform.

Never two dense zones in a row without a plate between them.

### 1.4 Explicit look anchors

- Found aesthetic: brushed aluminium rack gear, 2001 to 2005 Sony VAIO silver-and-blue, Motorola Talkabout/Eastpak era chrome type treatments, early Mac OS X brushed metal windows, UniFi's ownrack hardware design language (the actual UDM Pro and USW-Lite hardware is the reference object: silver slab, tiny LED column, engraved wordmark).
- NOT: Windows Vista Aero blur, iOS glassmorphism, neon synthwave grids, Tron-blue wireframe everything, gradient SaaS buttons.
- Chrome appears at full strength in exactly four places: the site logo wordmark, the hero nameplate, section title plates, and the architecture diagram device bodies. Everywhere else it is brushed or dark graphite. Chrome everywhere reads as a toy; rationed chrome reads as hardware.

### 1.5 Forbidden moves (hard rules)

- No em dash anywhere in any file, any heading level, comments included.
- No purple or magenta at any saturation.
- No border radius above 6px except status LED dots.
- No fake dashboard numbers: no invented uptime, no live clocks, no animated CPU meters labeled as real data.
- No stock photos, no lens flares in CSS, no noise overlays above 4% opacity.
- No animation on body text, ever.
- No low-contrast gray-on-gray body text under 4.5:1.

---

## 2. Color palette

Names are CSS custom property names. Values are final.

### 2.1 Foundations (the dark machine body)

| Token | Value | Use |
|---|---|---|
| `--void` | `#05070B` | page background, outermost dark |
| `--body` | `#0B111C` | standard panel body |
| `--raised` | `#101827` | raised card, chassis panel |
| `--recess` | `#070B12` | recessed tray, LCD background well |
| `--lcd-bg` | `#0D1410` | green LCD display background |
| `--lcd-bg-amber` | `#141006` | amber LCD variant |
| `--seam` | `#1E2A3A` | panel border, chassis outline |
| `--seam-hi` | `#26344A` | divider inside panels |

### 2.2 Chrome scale (polished metal, used as text and body fills)

| Token | Value | Use |
|---|---|---|
| `--chrome-1` | `#FFFFFF` | specular hits inside gradients only |
| `--chrome-2` | `#E7EEF7` | chrome text fallback, metal body |
| `--chrome-3` | `#C3CFDD` | chrome body base |
| `--chrome-4` | `#93A3B6` | chrome mid tone, inactive icons |
| `--chrome-5` | `#64748C` | chrome shadow tone, disabled metal |
| `--on-metal` | `#232B36` | dark text on chrome or aluminium fills |

### 2.3 Phosphor (the acid green, LCD protocol)

The green is phosphor-green, not neon:

| Token | Value | Use |
|---|---|---|
| `--ph` | `#B7F33C` | LCD text, active segment text |
| `--ph-dim` | `#6E9426` | idle LCD text, secondary readouts |
| `--ph-ghost` | `rgba(183,243,60,0.12)` | LCD gridlines, hover washes |
| `--led-green` | `#52D66A` | running status LED |
| `--led-amber` | `#FFB447` | caution, stopped, pending review |
| `--led-red` | `#FF5D51` | fault, never used decoratively |
| `--led-off` | `#3A4456` | unpowered port or component |

Green usage cap: on any full viewport, phosphor green covers under 8% of pixels. It is a screen color, not a brand fill. No green buttons, no green chrome, no green section backgrounds.

### 2.4 Acrylic blue (translucent cold glass, the VAIO accent)

| Token | Value | Use |
|---|---|---|
| `--acrylic` | `rgba(56,112,200,0.16)` | translucent blue panel fill over dark |
| `--acrylic-deep` | `rgba(24,58,120,0.35)` | deep end of acrylic panels |
| `--acrylic-edge` | `rgba(140,190,255,0.55)` | 1px edge light on acrylic |
| `--wire` | `#57C8FF` | network link lines in diagrams only |
| `--cyan-text` | `#8FD8FF` | link text inside dark LCD plates only |

Blue is the material of glass, not the color of actions. CTAs are metal, never blue.

### 2.5 The two named gradients (the only rich gradients in the system)

**`chrome-text`**, for display headings and the wordmark. A vertical polish with a horizon band, the classic chrome type treatment:

```css
background-image: linear-gradient(175deg,
  #FFFFFF 0%,
  #E7EEF7 18%,
  #A9B8C9 38%,
  #DDE6F0 49%,  /* horizon highlight band */
  #6A7B90 55%,  /* etched meeting line */
  #B7C4D4 78%,
  #EEF3F9 92%);
-webkit-background-clip: text;
color: var(--chrome-2); /* fallback when clipping is unavailable */
```

**`alu`**, brushed aluminium for device bodies and tray lips. Layered, top lit:

```css
background-image:
  repeating-linear-gradient(90deg,
    rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px,
    transparent 1px, transparent 3px),  /* brushing grain */
  linear-gradient(180deg, #9AA7B4 0%, #7C8896 42%, #8E9BAA 58%, #6F7B89 100%);
```

Everything else in the system is flat color or a two-stop translucent fade at most.

### 2.6 Contrast ledger (must pass WCAG AA)

- Body text: `#DCE4EF` on `#0B111C` (13.9:1). Primary.
- Secondary text: `#97A5BC` on `#0B111C` (6.5:1).
- Phosphor text: `#B7F33C` on `#0D1410` (11.6:1). Legal.
- On chrome/aluminium fills: only `--on-metal` (8:1). Never light text on metal.
- `--cyan-text` reserved for LCD plates: `#8FD8FF` on `#0D1410` passes 9:1.
- If a chrome gradient makes a small label unreadable, drop the gradient, use `--chrome-2` flat. Readability beats polish at text sizes under 18px.

---

## 3. Typography and font pairings

Four primary families with hard role separation, plus one optional accent family. No family is ever used outside its role.

| Role | Family (weights) | Sizing / tracking | Where |
|---|---|---|---|
| Display, wordmark, section plates | Michroma 400 | clamp(28px, 4.2vw, 52px), letter-spacing 0.02em | hero nameplate, section titles, logo |
| Console labels | Rajdhani 500/600/700 | 11 to 15px, uppercase, letter-spacing 0.14em | buttons, nav, bay headers, table headers, badges |
| Body | Encode Sans 400/500 | 16.5px / 1.65, 15.5px mobile | paragraphs, feature text |
| Console mono | Share Tech Mono 400 | 13px, 12px in dense cells | metadata rows, LCD text, snapshots, code |
| Segment digits (OPTIONAL accent) | DSEG7 Classic 300 (self-hosted, woff2, subset tiles only) | 18 to 24px | very rare, at most 2 numeric hooks on the whole page (guest count, disk count); must be removable with zero layout change; DSEG7 is the first font to cut under any load or licensing pressure |

Pairing logic: Michroma is the Eurostile Extended stand-in and carries the era; Rajdhani's squared terminals belong on the same machines; Encode Sans is a deliberately neutral humanist body that keeps long text readable (Trebuchet DNA, which is what 2005 web body type actually was): `--body-stack: "Encode Sans", "Trebuchet MS", Verdana, sans-serif;`.

### 3.1 Type rules

1. Display type is always chrome-text treatment or flat `--chrome-2`. Never phosphor. Never body-blue.
2. Rajdhani labels sit INSIDE hardware: on a tray header bar, on a bezel edge, on a port label strip. Rajdhani never floats in empty space.
3. LCD/lifecycle metadata always pairs Share Tech Mono with a snapshot stamp in `--ph-dim`: `SNAPSHOT 2026-11-02`, never a live timestamp.
4. Body paragraphs never sit directly on gradients or acrylic. Paragraph text belongs on `--body` or `--raised`.
5. One two-language-plausible apostrophe rule: use straight quotes everywhere; the era is pre-smart-quote.

---

## 4. Surface materials, bevels, reflections, shadows

Six materials total. Every UI element must use one of them, nothing else.

### 4.1 Material register

| Material | Recipe | Used for |
|---|---|---|
| **Polished chrome** | `chrome-text` gradient, 1px `--seam` outline when used as text on panels, single specular highlight | wordmark, nameplate, section plates, diagram device bodies |
| **Brushed aluminium** | `alu` gradient above, grain 3px horizontal, `--on-metal` engravings | device silhouettes, tray lips, primary button faces, plate backings |
| **Dark graphite shell** | flat `--raised`, top inset highlight `rgba(255,255,255,0.10)`, bottom inset `rgba(0,0,0,0.5)`, border 1px `--seam` | 90% of cards and panels, the default material |
| **Recessed well** | flat `--recess`, INVERTED bevel: top inset shadow `inset 0 2px 6px rgba(0,0,0,0.7)`, bottom inset highlight `inset 0 -1px 0 rgba(255,255,255,0.08)` | LCD screens, port grids, table readonly areas |
| **Translucent acrylic** | `--acrylic` fill, 1px `--acrylic-edge` border, inner 1px white top facet, no blur radius above 2px | network segment lanes, glass trays, filter stages |
| **Liquid glass lens** | same acrylic recipe plus one 2x24px elliptical white highlight at 20% opacity, top left | used on exactly ONE element per viewport: the remote access lens (Cloudflare/WireGuard gateway segments) |

### 4.2 Bevel tokens

```
--bevel-raise:  inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.55), 0 10px 24px rgba(0,0,0,0.45);
--bevel-press:  inset 0 2px 5px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05);
--bevel-well:   inset 0 2px 6px rgba(0,0,0,0.70), inset 0 -1px 0 rgba(255,255,255,0.08);
--bevel-lip:    inset 0 1px 0 rgba(255,255,255,0.28), 0 1px 0 var(--seam);
```

Buttons implement raise/press literally: default state uses `--bevel-raise` with an aluminium face; `:active` swaps to `--bevel-press` plus `transform: translateY(1px)`. No color change on press. Depth change, not color change.

### 4.3 Fasteners and seams

- **Rivet screws:** 6px circles, radial chrome gradient, one dark drop right-bottom, placed in the four corners of large chassis panels only (Proxmox/Unraid/UniFi platform cards, hero nameplate). Never on small cards.
- **Seam lines:** section boundaries 1px `--seam` plus a 32px-wide notch cut: a small dark keyhole notch on alternating sides, evoking rack rails.
- **Engraved wordmark detail:** device names on aluminium bodies are `--on-metal` at 90% opacity with a 0.5px white text-shadow at +1px y, which realizes "engraved silver text".
- **Perforation pattern** (fan grills, speaker holes): `radial-gradient` dot grid 6px pitch, only inside diagram device bodies, opacity 25%.

### 4.4 Reflection rules

- Reflections are BANDS, not mirrors: a soft 8px wide white band crossing a metal surface at 30% opacity suggests a curved reflection without pseudo-3D.
- LCD panels get a diagonal glass glint once: a 1px 45 degree line at `rgba(255,255,255,0.12)` inside the well. No animated sheen over content (readability first).
- Gradient text (chrome) gets NO additional glow or text-shadow. Glow plus gradient equals plastic.

---

## 5. Navigation and interaction design

### 5.1 Primary navigation: the segmented selector bar

A fixed top bar, rendered as a graphite chassis strip. The structure below is constant: exact height, paddings and tray dimensions are implementation-tuned per breakpoint (the earlier 56px strip was a desktop starting point and may be adjusted responsively), but the module layout and interaction states are fixed.

1. Left module: chrome wordmark "FG" glyph (24px square metal tile, bevel-raise) + "FACILITY OS" in Rajdhani 15px, then a thin vertical seam.
2. Center: a beveled tray (`--recess`, well bevel) holding segmented nav buttons, separated by 1px seams. Items: OVERVIEW / ARCHITECTURE / PLATFORM / SERVICES / METHOD. Buttons are Rajdhani 600 12px uppercase.
   - Default: `--chrome-4` text on recess well.
   - Hover: text lifts to `--chrome-2`, no background change (the well does not light up, the LABEL does).
   - Active section (scroll-synced): acrylic fill + 2px phosphor underline inside the segment + `--ph` text.
3. Right module: contact button, aluminium face, Rajdhani, bevel raise/press. Label: "CONTACT".
4. Far right, inside the same bar: a tiny always-on LCD window (Share Tech Mono 11px, `--ph-dim`) that displays the current section name in the form `>> ARCHITECTURE`. This is the nav's state display; it duplicates the active segment by design, like hardware that shows selection in two places.

Keyboard behavior: bar is a normal link list, `:focus-visible` = 2px phosphor outline offset 2px, order = DOM order.

All pixel values in 5.1 (tile, label and LCD window sizes) are development baselines, not hard constraints: responsive implementation may adjust them, provided the segmented structure, the two state displays and the keyboard behavior remain.

### 5.2 Mobile navigation

Below 760px the segmented tray becomes a horizontally scrollable strip inside the same chassis bar (scroll by touch, snap to segments), and the LCD window keeps working. No hamburger menu at any width: the section count (5) fits a scroll strip with room to spare. WebKit hiding of scrollbar is applied; segment edges keep 1px seams so cut-off items visually continue. Segment sizes, snap offsets and bar height are implementation-tuned; only the concept (scroll strip, visible seams, persistent LCD window, no hamburger) is fixed.

### 5.3 Interaction grammar

Actions may only be two kinds of affordance:

1. **Metal button** (aluminium face, raise/press, engraved Rajdhani label) for definitive actions: CONTACT, COPY, EXPAND ALL.
2. **Recessed switch row** (well bevel + small LED) for toggles: accordion headers in service bays, diagram layer toggles.

Links inside body copy: `--cyan-text` on dark plates, or `--chrome-2` underlined on graphite. Hover adds a 1px phosphor underline. Visited in body copy stays unchanged (a console does not track history visibly).

### 5.4 State displays (the machine always reports state)

- Every interactive table row expands; expansion animates height 220ms, NOT fade.
- Copy-to-clipboard actions (contact email, example commands) confirm with the button label swapping to `COPIED` in phosphor for 1.6s, plus the LED beside it going green. Confirmed, screen-reader-announced.
- Diagram hover: pointer over a device highlights it (aluminium brightens one step) and its connected links brighten to `--wire`; everything else dims 12%. Pointer-out restores. Works on touch by tap-select: first tap marks, second tap opens detail.
- Any element representing a snapshot observation can be identified visually: an amber corner tag `SNAPSHOT 2026-11-02` on state groups. Live-behavior guarantees are never implied by LED motion: LEDs are static glows colored by KNOWN snapshot state; only chassis LEDs unrelated to data (hero nameplate power LED) may breathe.

### 5.5 Focus and forms

No web forms exist in this site. Contact section: choose real channels when supplied (brief says only with real data; until then the CONTACT button anchors to the footer listing GitHub and email only if actually provided, otherwise shows "channels on request"). No fake form.

---

## 6. Component design language

A fixed parts list. Implementers MUST NOT invent new component species.

| Part | Anatomy | Notes |
|---|---|---|
| **ChassisCard** | graphite shell, 6px radius, bevel-raise, optional 4 rivets, header strip: Rajdhani label left + LED right | platform cards, hero stats |
| **Bay** | recessed well inside a ChassisCard, holds service modules | container for lists |
| **ServiceModule** | 24px padding, variance ALLOWED and required: each has a role icon plate (small 20px chrome icon on graphite square), name in body 500, mono metadata row, status LED, expandable detail drawer | the ONLY repeating card species; visually differentiated per role by icon plate tint (chrome icon on graphite, never colored icon fills) |
| **LcdStrip** | recessed well, dark LCD bg, Share Tech Mono, thin scanline texture at 4% opacity, head row in `--ph-dim`, data row `--ph` | tickers, counters, snapshot stamps |
| **PortHeader** | recessed well with a grid of 6px LED dots in a 1px chamfered frame | diagrams (switch ports), status banks |
| **LedDot** | radial gradient, pill radius, 10px, glow `0 0 6px rgba(color,0.35)` only when active | every state indicator |
| **MetalButton** | aluminium face, engraved label, raise/press | definitive actions |
| **SwitchRow** | recessed well + chevron tile + LedDot | accordion headers |
| **Plate** | section title: Rivetless aluminium backing strip, Michroma chrome-text, thin bottom edge `--bevel-lip` | section headers |
| **TagChip** | 2px radius, 1px `--seam-hi` border, Rajdhani 11px | snapshot stamps, technology chips |
| **Lane** | acrylic band 4 to 56px tall with `--wire` connectors | diagram segments, data flow lines |
| **Lens** | glass lens material (see 4.1) | remote access gateway element ONLY |

Iconography: one outline set style (Tabler, stroke 1.5), rendered `--chrome-4`, turning phosphor on active state. Icons are never filled, never gradient, never emoji. 20px at desktop, 18px mobile.

Radii ledger: LED 999, TagChip 2, ServiceModule 4, ChassisCard 6, everything else 0 or 2. There is no 8px+, no circles except LEDs, no blobs.

Composition rule to prevent "generic card grid": ServiceModules never repeat in perfectly even rows with identical heights; bays use a masonry-ish rhythm: one featured module (media stack) spans 2 columns and carries a mini LCD with its chain (Plex/Sonarr/Radarr/qBittorrent), others pack tighter. Grouping is by ROLE (brief requirement): media, network, documents, productivity, development, management.

---

## 7. Desktop layout and mobile adaptation

### 7.1 Desktop grid

- Content max width: 1240px, 12 columns, 24px gutters.
- Page background `--void` with an extremely subtle horizontal brushed texture (same grain recipe as aluminium at 5% opacity) so the void reads as a dark metal surround, NOT a flat black web page.
- Section vertical rhythm: 96px between sections, Plate to content 40px.
- Structures per section defined in section 9.

### 7.2 Mobile adaptation (its own design, not a squeeze)

- Nav: scrollable segmented strip (5.2), LCD window persists at the right edge.
- Architecture diagram: the horizontal spine becomes a VERTICAL fascia diagram: devices stack top-down as simplified aluminium silhouettes connected by `--wire` rails down the left edge, 64px per node minimum tap height, detail taps instead of hover.
- Platform ChassisCards: single column; rivets drop out below 760px (crowding); header strips keep LED.
- Service bays: featured module spans full width, all others single column, drawer expansion unchanged.
- LCD strips: text size 12px, no horizontal scroll, entries truncate with a device-width break, never elide a number.
- Typography: body 15.5px, Michroma hero clamps to 28px, Rajdhani labels never below 11px.
- Touch targets: 44px minimum for every actionable element; drawers add 12px hit padding around chevrons.
- The fixed nav bar hides after 480px of downward scroll and reappears on any upward scroll (it is a chassis lid, not a hijacker).

No separate mobile pages. No fake mobile drawer. This is the same console, re-racked.

---

## 8. Animation and motion principles

Console hardware moves in small mechanical increments. Binding rule above all others: ESSENTIAL TEXT AND DATA NEVER ANIMATE. Every number, status line, label and body paragraph must be fully present, complete and legible at t=0, with JavaScript disabled, and must never be hidden, delayed, revealed progressively or altered by any decorative effect. Animation is chrome polish on top, never a gate in front of information. Total animated layer budget: 5 concurrent animated visuals maximum on any viewport.

### 8.1 Timing tokens

```
--t-fast: 140ms;  /* hover states, label lifts */
--t-med:  220ms;  /* accordion expand, tray focus */
--t-mech: 300ms;  /* drawer chassis slide, cubic-bezier(0.3, 0.7, 0.15, 1) */
--t-gloss: 480ms; /* LCD load gloss, purely decorative */
--ease-out: cubic-bezier(0.2, 0, 0, 1);
```

### 8.2 Named motion behaviors (complete list; anything else is banned)

1. **Label lift:** nav/button labels rise from `--chrome-4` to `--chrome-2`, 140ms.
2. **Mechanical press:** bevel swap + 1px translate, 140ms.
3. **Drawer:** grid-template-rows 0fr to 1fr, 220ms, `--t-mech` easing; no fade of content (it reveals, like a tray extending).
4. **LCD load gloss:** in the first 480ms after first paint, LCD text may shift once from `--ph-dim` to `--ph`. This is pure color intensification: the text exists, complete and legible, from t=0 and with JavaScript disabled. No typing, no progressive reveal, no opacity ramp from 0, no content inserted or swapped after load. If an implementation cannot guarantee this, the gloss is dropped entirely.
5. **Status glow:** non-chassis LEDs are STATIC (they report snapshot truth). Only the one non-data power LED on the hero nameplate breathes: opacity 0.6 to 1.0, 2.4s ease-in-out infinite.
6. **Diagram focus:** device/link brightness cross-dissolve on hover, 140ms.
7. **COPIED confirm:** label swap + LED green, 1.6s revert.
8. **Scroll sync:** active nav segment + LCD window text swap, 140ms, driven by IntersectionObserver.
9. **Scanline shimmer:** LCD strips carry a 4% opacity moving hairline, 6s linear infinite. Subtle enough to survive a screenshot, never crossing or dimming the text glyphs themselves beyond that wash; if it touches readability at any size, it is cut.

### 8.3 Reduced motion

`prefers-reduced-motion: reduce` removes the load gloss, the breathing LED, the shimmer; accordion and press become 0ms. All content readable with animations fully off. This is required, not optional.

---

## 9. Page structure and content hierarchy

Single page "FACILITY OS" console, five major sections plus footer. Order and proposed content follow `WEBSITE_BRIEF.md` IA exactly.

### 9.0 Status vocabulary (binding, applies to every section)

The page must distinguish three different things: hardware that exists, workloads recorded as running at a point in time, and applications that appear only in an inventory list. Every service, guest and storage element carries exactly one status line, and the snapshot date is always on that line or on its grouping chip.

| Status | Marker | Eligible only when the handoff states it |
|---|---|---|
| `RUNNING AT SNAPSHOT 2026-11-02` | `--led-green`, static | a guest or host workload whose recorded snapshot state is running |
| `IDLE AT SNAPSHOT 2026-11-02` | `--led-off` | a guest or project whose recorded snapshot state is stopped (Desktop-5128, Pterodactyl, VPN, Squirrel Servers Manager, plus any Compose project marked stopped) |
| `IN INVENTORY (RUN STATE NOT RECORDED)` | hollow chrome marker: outlined dot, no fill, no glow | an application that appears in an inventory list with no recorded run state |
| `UNHEALTHY AT SNAPSHOT 2026-11-02` | `--led-amber` | worldmonitor only; its CURRENT state is not knowable and is never claimed |
| `ONLINE AT SNAPSHOT (NO REPORTED ERRORS)` | `--led-green`, static | ZFS pools and the NAS array at snapshot |
| `MOUNTED / DISK_OK AT SNAPSHOT 2026-11-02` | `--led-green`, static | each of the 5 Unraid data disks at snapshot |

Vocabulary rules that admit no exception:

1. `IN INVENTORY` is the DEFAULT for any CT 110 application inventory entry. An inventory entry is never upgraded to `RUNNING` and never shown with a green LED. Availability is never inferred from presence in a list.
2. Hardware in the diagrams (gateway, switches, access points) carries NO LEDs and NO inferred link states. Ports and status columns render as unlit bezel markers: recessed dots in a chamfered frame. Their LED and link states are not part of the record.
3. A status line or state group without a snapshot date is a spec violation.
4. Total inventory numbers and running counts always appear TOGETHER. The count line shows both, never the inventory size alone.

### 9.1 HERO: Nameplate

- Structure: full-width chassis plate, 560px min height desktop.
- Left 7 columns:
  - Small TagChip row: `PERSONAL INFRASTRUCTURE` / `SINGLE OPERATOR`.
  - Nameplate: name in Michroma chrome-text, 52px, on a rivetless aluminium strip with lip bevel.
  - Engraved subline (Rajdhani 15px uppercase on the same strip): `PROXMOX VE x UNRAID x UNIFI`.
  - Operator paragraph (Encode Sans, 18px, 2 sentences max, verified claims only): virtualization on Proxmox VE, bulk storage on Unraid, containerized services in a dedicated Docker LXC, managed UniFi switching, filtered DNS.
  - LCDStrip ticker, 1 row, inventory framing only: `GUESTS AT SNAPSHOT: 11 (2 VM + 9 LXC) | 7 RUNNING / 4 IDLE | NAS ARRAY AT SNAPSHOT: 5 x ~12TB | CACHE: ~1TB NVMe ZFS`. The ticker reports the snapshot inventory, never a live count.
- Right 5 columns: the console's masthead instrument:
  - An LcdStrip rendered as a "readout panel" (static, content legible at t=0, the decorative load gloss of 8.2 may apply): 4 static readout lines with values exactly as recorded:
    - `PLATFORM: PROXMOX VE 9.1.0 ON DEBIAN 13`
    - `STORAGE: ZFS MIRROR 2.05TB AVAIL (SNAPSHOT)` and `LVM-THIN ~68% USED (SNAPSHOT)`
    - `NETWORK: UDM PRO + CORE SWITCH + 3 NANOHD`
    - `ACCESS: CF TUNNEL + WIREGUARD | DNS: ADGUARD`
    - All lines stamped `SNAPSHOT 2026-11-02` in `--ph-dim`.
  - Beneath it, one breathing green LED labeled `POWER` (a chassis power indicator unrelated to any data claim) and one static amber LED labeled `SNAPSHOT DATA` (this is the honesty instrument: all states shown on the page are observations from the 2026-11-02 snapshot, not live telemetry).

### 9.2 ARCHITECTURE: the spine

- Plate: `ARCHITECTURE`.
- Intro paragraph: 3 sentences, plain description of physical network, virtualization, storage, remote access.
- The centerpiece: the Network Spine Diagram (specification in section 10.1), full width, recessed well, 420px tall desktop.
- Under the diagram: 4 small stat LcdStrips in one row (SNAP values: Main + Guest + IoT segments, 1 GbE reported, Cloudflare Tunnel + WireGuard access paths, AdGuard DNS).
- Responsive: vertical fascia variant per 7.2.

### 9.3 PLATFORM: three chassis cards

- Plate: `PLATFORM`.
- Grid: 12 columns; Proxmox card spans 6, Unraid 6, UniFi 4 appended below with an offset block (composition: row 1 = 6+6, row 2 = 4 + 8-wide "operating method" note panel). Rivets on all three chassis cards.
- Proxmox card: version/OS/CPU engraved on header. Guest marker row for the recorded inventory: 2 VM + 9 LXC, split shown as `7 RUNNING / 4 IDLE AT SNAPSHOT`, never the total alone. ZFS pool readout: `steam_cache1`, `ONLINE AT SNAPSHOT (NO REPORTED ERRORS)`, `~2.05TB AVAILABLE`, static green LED (meaning: recorded state, not liveness). Honest readout: `LOCAL LVM-THIN ~68% USED (SNAPSHOT)`.
- Unraid card: array visualization: 5 disk bays, each a mini alu bay with a static green LED labeled by its meaning `MOUNTED / DISK_OK AT SNAPSHOT`, plus an explicit EMPTY 6th slot with the amber TagChip `NO PARITY DISK CONFIGURED (SNAPSHOT)`, presented as a documented trade-off, per handoff. Cache readout: single ~1TB Samsung NVMe, ZFS pool `cache`, `ONLINE AT SNAPSHOT (NO REPORTED ERRORS)` plus amber TagChip `SINGLE DEVICE: NO POOL REDUNDANCY`. Shares strip `/Media /appdata /backups /domains /ISOs /system`, plus NFS readout `NFS /Media EXPORT: WRITE TESTS PASSED FROM PROXMOX + CT 101/106/110 (SNAPSHOT RECORD)`.
- UniFi card: UDM Pro + core switch (USW-Lite-16-PoE) + 3 nanoHD + reported unmanaged downstream switch note, Main/Guest/IoT segment lanes. Hardware rendered with unlit bezel markers only (9.0 rule 2). Mono note `1 GbE REPORTED`. No switch model or uplink detail beyond the reported downstream relation.

### 9.4 SERVICES: bays grouped by role

- Plate: `SERVICES`.
- Six bays, each a ChassisCard with a role header and an LED count readout (`RUNNING AT SNAPSHOT: n`):
  1. Media (featured, spans 2 cols, includes chain LCD: Plex with NVIDIA passthrough chip, Sonarr/Radarr, Prowlarr, qBittorrent, Overseerr, Tautulli, Listenarr).
  2. Network & access (AdGuard, WireGuard, Cloudflare Tunnel host note, Pterodactyl noted as STOPPED AT SNAPSHOT).
  3. Documents (Paperless-ngx, Stirling PDF, Obsidian).
  4. Productivity and household (Home Assistant, Mealie, Dashwise).
  5. Development (Docker LXC host platform data: Ubuntu 22.04, 8 cores / 64 GB, Portainer, Squirrel Servers Manager STOPPED AT SNAPSHOT).
  6. Storage and index (bitmagnet, Karakeep, AliasVault, PriceBuddy, NextExplorer).
- All state labels come from the 2026-11-02 snapshot and every bay carries the amber snapshot chip. Stopped services show LedDot `--led-off` + Rajdhani `IDLE AT SNAPSHOT`; they are never listed as running.

### 9.5 METHOD: engineering approach

- Plate: `METHOD`.
- Left: 4 numbered plate items (Rajdhani numerals on aluminium tabs): ownership and documentation, observability and diagnostics, care-informed automation, first query troubleshooting narrative (verified historical: ZFS pool incident resolved, kept as experience, NOT as current state).
- Right: LcdStrip "console backlog": honest open items phrased as active engineering, such as RFC1918 renumbering review, exposure review of port forwards without details, guest/IoT isolation verification. These humanize the lab and cannot be faked, and they derive from the private notes WITHOUT publishing any address or rule.

### 9.6 FOOTER

- Aluminium lip strip: engraved `FACILITY OS 2005` left, right side: link row (GitHub only if supplied; the brief permits contact/CV/GitHub links only with real data).
- One line in Share Tech Mono `--ph-dim`: `SNAPSHOT DATA: 2026-11-02 | NO LIVE TELEMETRY ON THIS PAGE`.
- External infrastructure mention: one TagChip row note: `SOME WORKLOADS RUN ON EXTERNALLY HOSTED INFRASTRUCTURE`, no detail (brief 10).

---

## 10. Applying the visual direction to the homelab content

This is where generic design documents fail. Here are concrete treatments per real structure.

### 10.1 ARCHITECTURE: the Network Spine Diagram

Rendered as a horizontal hardware fascia (desktop), drawn entirely from handoff-confirmed facts with abstract labels (no IPs, no unconfirmed uplinks):

Row of device silhouettes and lanes, left to right:

1. **EDGE LENS (access panel, floating):** a glass lens block (the one allowed Liquid Glass Lens element) at the top edge of the diagram, visually SEPARATE from the hardware spine. It carries the two recorded access mechanisms as labeled path chips: `CLOUDFLARE TUNNEL` (used for selected services) and `WIREGUARD`. NO solid link line is drawn from the lens into any LAN device, because the traversal route through the network is not part of the verified record. At most, a short dashed line labeled `OVERLAY ACCESS PATHS (LOGICAL ONLY)` connects the lens DOWNWARD, drawn dashed to distinguish logic from cabling. The panel must not imply that all services are tunnel-only (brief rule): the copy says "selected services" and notes that other exposure exists without details.
2. **UDM PRO:** polished chrome slab 96px tall, engraved `UDM PRO` (gateway, routing, firewall, controller are its recorded roles, engraved in mono under the name). LED column rendered as UNLIT BEZEL MARKERS: gateway LED states are not part of the verified record and are never colored. Three Lane exits in acrylic:
   - Lane `MAIN` (widest, acrylic-deep, 56px tall),
   - Lane `GUEST` (24px, dimmer),
   - Lane `IoT` (24px, dimmer).
   Lanes carry abstract labels only. NO subnet values published. The handoff caveat is honored: lanes connecting to firewall are labeled `SEGMENTED (VERIFICATION IN PROGRESS)` in `--ph-dim` mono.
3. **USW-Lite-16-PoE:** brushed aluminium 1U slab, PortHeader rendered as 16 UNLIT port markers (no port LED states are recorded). Beneath the fascia, one mono annotation: `REPORTED: ONE PORT FEEDS AN UNMANAGED DOWNSTREAM SWITCH`. The annotation is a labeled note, NOT a colored LED: this makes the handoff's honesty about the unmanaged switch part of the visual system without inventing hardware state.
4. **AP TRIO:** three small chrome towers, identical, each with unlit bezel markers and a mono annotation `AP LINK STATE NOT RECORDED`. No LEDs.
5. **RACK BLOCK (right 40%):** two stacked sub-chassis:
   - **PROXMOX VE NODE** (9.1.0): graphite sub-chassis with a vmbr0 tray into which LXC and VM tabs plug (guest interfaces were recorded on vmbr0 through enp3s0, enp4s0 DOWN: draw ONE physical uplink from the bridge tray toward the network spine, labeled `REPORTED: 1 GbE VIA enp3s0`). Badges: `2 VM / 9 LXC AT SNAPSHOT` and `7 RUNNING / 4 IDLE AT SNAPSHOT`, plus ZFS TagChip `ZFS MIRROR ONLINE (SNAPSHOT)`.
   - **UNRAID NAS (7.2.0):** graphite sub-chassis with a 5-slot disk fascia (5 mini alu bays, static green LED meaning `MOUNTED / DISK_OK AT SNAPSHOT`) and an explicit EMPTY 6th slot outline with amber TagChip `NO PARITY DISK CONFIGURED`. The empty slot is the point: it is an honest capacity void, deliberately visual.

Connectors: all links are 2px `--wire` lines with soft glow at 30%; the spine is a LOGICAL map (a label above the well states: `LOGICAL MAP - PHYSICAL CABLING NOT PUBLISHED`). Only two drawn lines carry a REPORTED qualifier for a physical fact: the reported downstream-switch feed from the core switch, and the reported `enp3s0` uplink from the Proxmox bridge tray. Any other drawn link is a logical relation between recorded roles, not a cabling claim. Shimmer exists only inside the edge lens panel's path chips; the LAN spine never shimmers, because link activity is unverified.

Hover behavior per 5.4: hovering a device highlights it and its LOGICALLY recorded relations (UDM Pro highlights the three segment lanes; the Proxmox node highlights the vmbr0 tray, the reported uplink and the NFS relation to Unraid labeled `NFS /Media EXPORT: WRITE TESTS PASSED (SNAPSHOT RECORD)` in mono). This is a handoff-verified fact and should be shown, unlike invented relationships.

### 10.2 PLATFORM chassis cards: three distinct visual voices

Same chassis species, different face treatments so they never read as a repeated card grid:

- **Proxmox card:** the "hypervisor node": header engraved on dark graphite with a guest bank LCD strip; body lists all 11 recorded guests in a compact recessed well, each row: type tab (VM vs LXC in a Rajdhani badge), name, status LED, mono metadata, every state stamped to the snapshot. The four STOPPED guests at snapshot (Desktop-5128, Pterodactyl, the VPN LXC, Squirrel Servers Manager) render `--led-off` with `IDLE AT SNAPSHOT`.
- **Unraid card:** the "storage shelf" (described in 9.3): the disk fascia dominates; CPU/RAM engraved small (`24 THREADS`, `256 GiB RAM`); below fascia, an acrylic share tray showing the six share names as perforated folder tabs.
- **UniFi card:** the "wall panel": vertical orientation feel, three Lane rows (Main/Guest/IoT) stacked as acrylic bands with device counts absent (counts NOT verified: do not publish device counts, brief rule), plus a mono note `1 GbE REPORTED`.

### 10.3 SERVICES bays: how individual service modules look

Each ServiceModule is real, from the handoff app inventory, grouped by role. Concretely:

- **Plex module (featured, media):** icon plate shows a chrome play glyph; status LED green; TagChips: `NVIDIA PASSTHROUGH (REPORTED)` + `LXC 101`; drawer expands to a 2-line explanation of why it is its own LXC (GPU passthrough) at snapshot. Copy states nothing about current availability.
- **AdGuard module (network bay):** icon: chrome shield; the module is visually differentiated by a small funnel render: three mini Lane rows entering one recessed well, labeled abstractly `HOUSEHOLD DNS -> FILTERED`. Amber NOT used here; it is a running service at snapshot.
- **WireGuard module:** shown with a small lens fragment (reuse of remote access motif) labeled `VPN ACCESS PATH`, not a full lens, keeping lens exclusivity for the architecture diagram. Status: the WireGuard LXC was recorded running at snapshot, so it carries `RUNNING AT SNAPSHOT 2026-11-02`.
- **Docker LXC host module (development bay):** rendered as a TRAY not a card face: inside the bay, a mini fascia showing mounts as three wide acrylic rails: `/Media`, `/shared`, `/Cloud`, each terminating in a dot connecting toward the Unraid shelf rendered as a 24px alu silhouette at the corner. This visualizes the handoff's verified NFS relationship without a number. Note under the rails in mono: `MOUNTS AS RECORD; /Cloud IS A MOUNT PATH ONLY, NO HOSTED-SERVICE IDENTITY ATTACHED (no Nextcloud or similar implication)`.
- **Stopped modules (Pterodactyl, Squirrel Servers Manager):** graphite dimmed 12%, LED `--led-off`, Rajdhani `IDLE AT SNAPSHOT`-, drawer opens to a one-line honest note. They stay on the page because a lab with idle bays is credible; they never fake activity.

### 10.4 METHOD section: the engineer's plates

Render the four approach items as real physical tabs: vertical alu tabs with engraved Rajdhani numerals `01 02 03 04`, each expanding to a body paragraph like a chassis drawer. Right side console backlog LCD lists open engineering items (9.5). Visual identity here is intentionally the darkest section: it reads as the console's service documentation drawer.

### 10.5 What the aesthetic means for data honesty

The hardware metaphor is not decoration; it carries the honesty policy:

- LEDs only report what a source document states (snapshot run/idle states): no LED implies liveness. Gateway, switch and AP LEDs NEVER light, because their states were never recorded.
- The amber `SNAPSHOT DATA` LED on the hero is permanently lit: the whole page is a snapshot report, and this is displayed physically.
- Stopped/idle gear is visibly unpowered rather than omitted: idle bays, the empty parity slot, unlit port markers and the reported-but-unlabeled downstream switch all use the same visual grammar of "recorded, but not live".
- No animated traffic meters on links, since link activity is unverified. The LAN spine is static; only the edge access panel shimmers.

---

## 11. Accessibility and quality gate

- Contrast ledger in 2.6 is mandatory and machine-checkable: run a contrast pass on every token pair used.
- Diagram MUST have an accessible fallback: skip-link target to a `<details>` text listing of every device and relationship in the diagram, same facts, plain text.
- All animated surfaces honor 8.3 reduced-motion.
- Chrome gradient text never below 28px (keeps thin strokes off small type).
- `:focus-visible` phosphor outline everywhere; nav and drawers keyboard-operable in a logical order.
- Quality gate per Constitution: if the architecture diagram and platform cards can have their chrome, aluminium, bevels and LCD plates stripped away and nothing changes, the implementation has failed. The final page must read at a glance as machined hardware with glowing displays, dark editorial typography underneath, acid green strictly as phosphor.

END OF SPEC. Do not implement until this document is approved unchanged or amended.
