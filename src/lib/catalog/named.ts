// Hand-authored named scales. Only `steps` + metadata are supplied; id and
// pcNumber are derived. DESIGN.md §2.1.
import { stepsToId, pcNumber } from '../theory/id';
import type { ScaleRecord, Family, ParentRelation } from './types';

interface Seed {
	slug: string;
	name: string;
	steps: number[];
	family: Family;
	aliases?: string[];
	description?: string;
	mood?: string;
	colour?: string;
	examples?: string[];
	parent?: ParentRelation;
	relations?: string[];
}

const SEEDS: Seed[] = [
	{
		slug: 'major',
		name: 'Major (Ionian)',
		steps: [2, 2, 1, 2, 2, 2, 1],
		family: 'major',
		aliases: ['Ionian'],
		description: 'The reference scale; all degrees natural.',
		mood: 'Bright, resolved, stable.',
		colour: 'clear daylight yellow',
		examples: ['Twinkle, Twinkle', 'most pop & folk'],
		relations: ['aeolian', 'mixolydian', 'lydian']
	},
	{
		slug: 'dorian',
		name: 'Dorian',
		steps: [2, 1, 2, 2, 2, 1, 2],
		family: 'mode',
		mood: 'Minor but hopeful; the natural 6 lifts it.',
		colour: 'cool teal',
		examples: ['Scarborough Fair', 'So What — Miles Davis'],
		parent: { scaleId: 'major', degree: 2, text: '2nd mode of the major scale' },
		relations: ['major', 'aeolian', 'phrygian']
	},
	{
		slug: 'phrygian',
		name: 'Phrygian',
		steps: [1, 2, 2, 2, 1, 2, 2],
		family: 'mode',
		mood: 'Dark, Spanish; the ♭2 bites.',
		colour: 'deep indigo',
		examples: ['flamenco', 'metal riffing'],
		parent: { scaleId: 'major', degree: 3, text: '3rd mode of the major scale' },
		relations: ['major', 'aeolian', 'phrygian-dominant']
	},
	{
		slug: 'lydian',
		name: 'Lydian',
		steps: [2, 2, 2, 1, 2, 2, 1],
		family: 'mode',
		mood: 'Floating, dreamy; the ♯4 opens it up.',
		colour: 'pale sky blue',
		examples: ['The Simpsons theme', 'film wonder cues'],
		parent: { scaleId: 'major', degree: 4, text: '4th mode of the major scale' },
		relations: ['major', 'mixolydian']
	},
	{
		slug: 'mixolydian',
		name: 'Mixolydian',
		steps: [2, 2, 1, 2, 2, 1, 2],
		family: 'mode',
		mood: 'Major with a bluesy ♭7; dominant.',
		colour: 'warm ochre',
		examples: ['Sweet Home Alabama', 'Norwegian Wood'],
		parent: { scaleId: 'major', degree: 5, text: '5th mode of the major scale' },
		relations: ['major', 'dorian']
	},
	{
		slug: 'aeolian',
		name: 'Natural Minor (Aeolian)',
		steps: [2, 1, 2, 2, 1, 2, 2],
		family: 'minor',
		aliases: ['Aeolian', 'Natural minor'],
		mood: 'Sombre, classic minor.',
		colour: 'slate grey-blue',
		examples: ['Stairway descent', 'countless ballads'],
		parent: { scaleId: 'major', degree: 6, text: '6th mode of the major scale (relative minor)' },
		relations: ['harmonic-minor', 'melodic-minor', 'dorian']
	},
	{
		slug: 'locrian',
		name: 'Locrian',
		steps: [1, 2, 2, 1, 2, 2, 2],
		family: 'mode',
		mood: 'Unstable; diminished tonic, ♭2 and ♭5.',
		colour: 'murky violet',
		examples: ['rare — tension passages'],
		parent: { scaleId: 'major', degree: 7, text: '7th mode of the major scale' },
		relations: ['major', 'phrygian']
	},
	{
		slug: 'harmonic-minor',
		name: 'Harmonic Minor',
		steps: [2, 1, 2, 2, 1, 3, 1],
		family: 'minor',
		mood: 'Minor with a raised 7; exotic leading tone.',
		colour: 'burgundy',
		examples: ['classical cadences', 'neoclassical metal'],
		relations: ['aeolian', 'phrygian-dominant', 'melodic-minor']
	},
	{
		slug: 'melodic-minor',
		name: 'Melodic Minor (ascending)',
		steps: [2, 1, 2, 2, 2, 2, 1],
		family: 'minor',
		aliases: ['Jazz minor'],
		mood: 'Minor third over a major-ish top.',
		colour: 'muted rose',
		examples: ['jazz improvisation'],
		relations: ['aeolian', 'harmonic-minor', 'major']
	},
	{
		slug: 'major-pentatonic',
		name: 'Major Pentatonic',
		steps: [2, 2, 3, 2, 3],
		family: 'pentatonic',
		mood: 'Open, singable, no semitones.',
		colour: 'spring green',
		examples: ['Amazing Grace', 'My Girl'],
		relations: ['minor-pentatonic', 'major']
	},
	{
		slug: 'minor-pentatonic',
		name: 'Minor Pentatonic',
		steps: [3, 2, 2, 3, 2],
		family: 'pentatonic',
		mood: 'The rock/blues backbone.',
		colour: 'denim blue',
		examples: ['blues & rock solos'],
		relations: ['major-pentatonic', 'blues-minor']
	},
	{
		slug: 'blues-minor',
		name: 'Minor Blues',
		steps: [3, 2, 1, 1, 3, 2],
		family: 'blues',
		description: 'Minor pentatonic plus the ♭5 "blue note".',
		mood: 'Gritty, vocal, expressive.',
		colour: 'smoky indigo',
		examples: ['12-bar blues'],
		relations: ['minor-pentatonic']
	},
	{
		slug: 'whole-tone',
		name: 'Whole Tone',
		steps: [2, 2, 2, 2, 2, 2],
		family: 'symmetric',
		mood: 'Weightless, dreamlike, no pull.',
		colour: 'frosted lilac',
		examples: ['Debussy', 'dream sequences'],
		relations: ['octatonic-hw']
	},
	{
		slug: 'octatonic-hw',
		name: 'Octatonic (Half–Whole)',
		steps: [1, 2, 1, 2, 1, 2, 1, 2],
		family: 'symmetric',
		aliases: ['Diminished (dominant)'],
		mood: 'Tense, symmetrical, jazzy.',
		colour: 'electric teal',
		examples: ['dominant-chord jazz lines'],
		relations: ['octatonic-wh', 'whole-tone']
	},
	{
		slug: 'octatonic-wh',
		name: 'Octatonic (Whole–Half)',
		steps: [2, 1, 2, 1, 2, 1, 2, 1],
		family: 'symmetric',
		aliases: ['Diminished'],
		mood: 'Tense, symmetrical, eerie.',
		colour: 'deep cyan',
		examples: ['diminished-chord passages'],
		relations: ['octatonic-hw']
	},
	{
		slug: 'phrygian-dominant',
		name: 'Phrygian Dominant',
		steps: [1, 3, 1, 2, 1, 2, 2],
		family: 'world',
		aliases: ['Spanish Phrygian', 'Freygish', 'Hijaz'],
		description: 'Major third over a Phrygian ♭2/♭6 — the harmonic-minor dominant.',
		mood: 'Tense, exotic, Spanish / Middle-Eastern.',
		colour: 'deep amber, smoky red',
		examples: ["Caravan (the 'Egyptian' sound)", 'Misirlou', 'Hava Nagila'],
		parent: { scaleId: 'harmonic-minor', degree: 5, text: '5th mode of the harmonic minor scale' },
		relations: ['harmonic-minor', 'phrygian', 'double-harmonic']
	},
	{
		slug: 'double-harmonic',
		name: 'Double Harmonic Major',
		steps: [1, 3, 1, 2, 1, 3, 1],
		family: 'world',
		aliases: ['Byzantine', 'Arabic', 'Gypsy major'],
		mood: 'Two augmented steps; intensely exotic.',
		colour: 'gilded crimson',
		examples: ['Misirlou (head)', 'Middle-Eastern themes'],
		relations: ['phrygian-dominant', 'hungarian-minor']
	},
	{
		slug: 'hungarian-minor',
		name: 'Hungarian Minor',
		steps: [2, 1, 3, 1, 1, 3, 1],
		family: 'world',
		aliases: ['Gypsy minor'],
		mood: 'Harmonic minor with a raised 4; dramatic.',
		colour: 'dark wine',
		examples: ['Hungarian/Romani folk'],
		relations: ['harmonic-minor', 'double-harmonic']
	},

	// ── Japanese pentatonics ─────────────────────────────────────
	{
		slug: 'hirajoshi',
		name: 'Hirajoshi',
		steps: [2, 1, 4, 1, 4],
		family: 'pentatonic',
		aliases: ['Hira-choshi', 'Kata-kumoi'],
		description: 'A 17th-century koto tuning by Yatsuhashi Kengyō.',
		mood: 'Still, austere, distinctly Japanese.',
		colour: 'ink-wash grey',
		examples: ['koto music', 'Sakura (variant)'],
		relations: ['iwato', 'insen', 'kumoi']
	},
	{
		slug: 'iwato',
		name: 'Iwato',
		steps: [1, 4, 1, 4, 2],
		family: 'pentatonic',
		mood: 'Dark, suspended; two tritone leaps.',
		colour: 'slate',
		examples: ['Japanese traditional'],
		relations: ['hirajoshi', 'insen']
	},
	{
		slug: 'insen',
		name: 'Insen',
		steps: [1, 4, 2, 3, 2],
		family: 'pentatonic',
		mood: 'Shadowy, plaintive (the "in" / dark pentatonic).',
		colour: 'deep slate blue',
		examples: ['shamisen & koto'],
		relations: ['hirajoshi', 'iwato']
	},
	{
		slug: 'yo',
		name: 'Yo',
		steps: [2, 3, 2, 2, 3],
		family: 'pentatonic',
		aliases: ['Ritsusen'],
		mood: 'Bright, open; the "yo" / light pentatonic, no semitones.',
		colour: 'pale jade',
		examples: ['folk song', 'Buddhist shōmyō'],
		relations: ['major-pentatonic', 'minor-pentatonic']
	},
	{
		slug: 'kumoi',
		name: 'Kumoi',
		steps: [2, 1, 4, 2, 3],
		family: 'pentatonic',
		aliases: ['Akebono'],
		mood: 'Wistful Japanese colour.',
		colour: 'dawn rose',
		examples: ['koto music'],
		relations: ['hirajoshi']
	},
	{
		slug: 'egyptian',
		name: 'Egyptian',
		steps: [2, 3, 2, 3, 2],
		family: 'pentatonic',
		aliases: ['Suspended pentatonic'],
		description: 'A mode of the major pentatonic.',
		mood: 'Open, ambiguous, suspended.',
		colour: 'sand',
		relations: ['major-pentatonic', 'minor-pentatonic']
	},

	// ── Symmetric / hexatonic ────────────────────────────────────
	{
		slug: 'augmented',
		name: 'Augmented',
		steps: [3, 1, 3, 1, 3, 1],
		family: 'symmetric',
		aliases: ['Symmetric augmented'],
		description: 'Alternating minor-third and semitone; repeats every major third.',
		mood: 'Shimmering, unstable, modern.',
		colour: 'iridescent violet',
		examples: ['Shostakovich', 'Liszt'],
		relations: ['whole-tone']
	},
	{
		slug: 'tritone-scale',
		name: 'Tritone Scale',
		steps: [1, 3, 2, 1, 3, 2],
		family: 'symmetric',
		aliases: ['Two-semitone tritone', 'Petrushka'],
		mood: 'Bitonal, biting; repeats at the tritone.',
		colour: 'acid green',
		examples: ['Stravinsky — Petrushka'],
		relations: ['augmented']
	},
	{
		slug: 'prometheus',
		name: 'Prometheus',
		steps: [2, 2, 2, 3, 1, 2],
		family: 'jazz',
		aliases: ["Scriabin's Prometheus", 'Mystic'],
		description: 'Built on the mystic chord.',
		mood: 'Luminous, hovering, mystical.',
		colour: 'electric gold',
		examples: ['Scriabin — Poem of Fire'],
		relations: ['whole-tone']
	},
	{
		slug: 'major-blues',
		name: 'Major Blues',
		steps: [2, 1, 1, 3, 2, 3],
		family: 'blues',
		description: 'Major pentatonic plus the ♭3 "blue note".',
		mood: 'Bright, vocal, swinging.',
		colour: 'warm denim',
		examples: ['blues & country'],
		relations: ['major-pentatonic', 'blues-minor']
	},

	// ── Modes of the melodic minor (jazz) ────────────────────────
	{
		slug: 'dorian-flat2',
		name: 'Dorian ♭2',
		steps: [1, 2, 2, 2, 2, 1, 2],
		family: 'jazz',
		aliases: ['Phrygian ♮6', 'Assyrian', 'Javanese'],
		mood: 'Phrygian darkness with a lifted 6.',
		colour: 'umber',
		parent: { scaleId: 'melodic-minor', degree: 2, text: '2nd mode of the melodic minor scale' },
		relations: ['melodic-minor', 'phrygian']
	},
	{
		slug: 'lydian-augmented',
		name: 'Lydian Augmented',
		steps: [2, 2, 2, 2, 1, 2, 1],
		family: 'jazz',
		mood: 'Floating and bright with a raised 5.',
		colour: 'pale gold',
		parent: { scaleId: 'melodic-minor', degree: 3, text: '3rd mode of the melodic minor scale' },
		relations: ['melodic-minor', 'lydian']
	},
	{
		slug: 'acoustic',
		name: 'Acoustic (Lydian Dominant)',
		steps: [2, 2, 2, 1, 2, 1, 2],
		family: 'jazz',
		aliases: ['Lydian dominant', 'Lydian ♭7', 'Overtone', 'Mixolydian ♯4'],
		description: 'Approximates the natural overtone series (♯4 and ♭7).',
		mood: 'Bright, airy, dominant-functioning.',
		colour: 'sunlit amber',
		examples: ['jazz', 'film scores'],
		parent: { scaleId: 'melodic-minor', degree: 4, text: '4th mode of the melodic minor scale' },
		relations: ['melodic-minor', 'lydian', 'mixolydian']
	},
	{
		slug: 'melodic-major',
		name: 'Melodic Major',
		steps: [2, 2, 1, 2, 1, 2, 2],
		family: 'jazz',
		aliases: ['Mixolydian ♭6', 'Aeolian dominant', 'Hindu'],
		mood: 'Major turning bittersweet at the ♭6.',
		colour: 'faded terracotta',
		parent: { scaleId: 'melodic-minor', degree: 5, text: '5th mode of the melodic minor scale' },
		relations: ['melodic-minor', 'mixolydian']
	},
	{
		slug: 'half-diminished',
		name: 'Half-Diminished',
		steps: [2, 1, 2, 1, 2, 2, 2],
		family: 'jazz',
		aliases: ['Locrian ♮2', 'Aeolian ♭5'],
		mood: 'Locrian softened by a natural 2.',
		colour: 'cold steel',
		examples: ['ø7 chords in jazz'],
		parent: { scaleId: 'melodic-minor', degree: 6, text: '6th mode of the melodic minor scale' },
		relations: ['melodic-minor', 'locrian']
	},
	{
		slug: 'altered',
		name: 'Altered',
		steps: [1, 2, 1, 2, 2, 2, 2],
		family: 'jazz',
		aliases: ['Super Locrian', 'Diminished whole-tone', 'Altered dominant'],
		description: 'Every tension above the root is flattened.',
		mood: 'Maximum tension; the go-to altered-dominant sound.',
		colour: 'charcoal',
		examples: ['jazz V7alt chords'],
		parent: { scaleId: 'melodic-minor', degree: 7, text: '7th mode of the melodic minor scale' },
		relations: ['melodic-minor', 'locrian']
	},

	// ── Other heptatonic exotics ─────────────────────────────────
	{
		slug: 'harmonic-major',
		name: 'Harmonic Major',
		steps: [2, 2, 1, 2, 1, 3, 1],
		family: 'jazz',
		mood: 'Major with a borrowed ♭6; a sudden shadow.',
		colour: 'amber & rust',
		relations: ['major', 'harmonic-minor']
	},
	{
		slug: 'hungarian-major',
		name: 'Hungarian Major',
		steps: [3, 1, 2, 1, 2, 1, 2],
		family: 'world',
		mood: 'Bright but spiky; ♯2 and ♯4 over a major root.',
		colour: 'paprika red',
		examples: ['Bartók', 'Romani music'],
		relations: ['hungarian-minor', 'acoustic']
	},
	{
		slug: 'ukrainian-dorian',
		name: 'Ukrainian Dorian',
		steps: [2, 1, 3, 1, 2, 1, 2],
		family: 'world',
		aliases: ['Romanian minor', 'Dorian ♯4'],
		mood: 'Dorian with a raised 4; Eastern-European lilt.',
		colour: 'forest & gold',
		examples: ['Ukrainian & Klezmer music'],
		parent: { scaleId: 'harmonic-minor', degree: 4, text: '4th mode of the harmonic minor scale' },
		relations: ['harmonic-minor', 'dorian']
	},
	{
		slug: 'neapolitan-major',
		name: 'Neapolitan Major',
		steps: [1, 2, 2, 2, 2, 2, 1],
		family: 'world',
		description: 'Melodic minor with a lowered 2nd.',
		mood: 'Smooth yet exotic; ♭2 over a major top.',
		colour: 'pearl',
		relations: ['neapolitan-minor', 'melodic-minor']
	},
	{
		slug: 'neapolitan-minor',
		name: 'Neapolitan Minor',
		steps: [1, 2, 2, 2, 1, 3, 1],
		family: 'world',
		mood: 'Harmonic minor with a ♭2; grave and Iberian.',
		colour: 'dried plum',
		examples: ['Beethoven', 'flamenco-adjacent'],
		relations: ['neapolitan-major', 'harmonic-minor']
	},
	{
		slug: 'enigmatic',
		name: 'Enigmatic',
		steps: [1, 3, 2, 2, 2, 1, 1],
		family: 'jazz',
		description: "Verdi's puzzle scale (Scala enigmatica).",
		mood: 'Strange, unresolved, riddling.',
		colour: 'oil-slick',
		examples: ['Verdi — Ave Maria'],
		relations: ['augmented']
	},
	{
		slug: 'persian',
		name: 'Persian',
		steps: [1, 3, 1, 1, 2, 3, 1],
		family: 'world',
		mood: 'Two augmented seconds; intensely Middle-Eastern.',
		colour: 'lapis & saffron',
		relations: ['double-harmonic', 'phrygian-dominant']
	},

	// ── Bebop (octatonic) ────────────────────────────────────────
	{
		slug: 'bebop-dominant',
		name: 'Bebop Dominant',
		steps: [2, 2, 1, 2, 2, 1, 1, 1],
		family: 'jazz',
		description: 'Mixolydian plus a chromatic passing ♮7.',
		mood: 'Swinging; the chromatic glue of bebop lines.',
		colour: 'brass',
		examples: ['Charlie Parker', 'Dizzy Gillespie'],
		relations: ['mixolydian', 'bebop-major']
	},
	{
		slug: 'bebop-major',
		name: 'Bebop Major',
		steps: [2, 2, 1, 2, 1, 1, 2, 1],
		family: 'jazz',
		description: 'Major plus a chromatic passing ♯5.',
		mood: 'Bright bebop colour.',
		colour: 'polished brass',
		examples: ['bebop & swing'],
		relations: ['major', 'bebop-dominant']
	}
];

export const NAMED_SCALES: ScaleRecord[] = SEEDS.map((s) => ({
	id: stepsToId(s.steps),
	steps: s.steps,
	pcNumber: pcNumber(s.steps),
	family: s.family,
	named: true,
	slug: s.slug,
	name: s.name,
	aliases: s.aliases,
	description: s.description,
	mood: s.mood,
	colour: s.colour,
	examples: s.examples,
	parent: s.parent,
	relations: s.relations
}));
