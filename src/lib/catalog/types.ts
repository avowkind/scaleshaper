export type Family =
	| 'major'
	| 'minor'
	| 'mode'
	| 'pentatonic'
	| 'blues'
	| 'symmetric'
	| 'world'
	| 'jazz'
	| 'generated';

export interface ParentRelation {
	scaleId: string; // id or slug of the parent scale
	degree: number;
	text: string;
}

export interface ScaleRecord {
	id: string; // canonical, derived from steps (e.g. "2-2-1-2-2-2-1")
	steps: number[]; // the one required structural fact
	pcNumber: number; // derived 12-bit pitch-class number
	family: Family;
	named: boolean;
	slug?: string;
	name?: string;
	aliases?: string[];
	description?: string;
	mood?: string;
	colour?: string;
	examples?: string[];
	parent?: ParentRelation;
	relations?: string[]; // ids or slugs
}

export const FAMILY_ORDER: Family[] = [
	'major',
	'mode',
	'minor',
	'pentatonic',
	'blues',
	'symmetric',
	'world',
	'jazz',
	'generated'
];

export const FAMILY_LABEL: Record<Family, string> = {
	major: 'Major',
	mode: 'Diatonic modes',
	minor: 'Minor variants',
	pentatonic: 'Pentatonic',
	blues: 'Blues',
	symmetric: 'Symmetric',
	world: 'World & traditional',
	jazz: 'Jazz & modern',
	generated: 'Explorer'
};

// Per-family colours, shared by the sidebar group dots and the Explorer tints.
// `accent` is the saturated marker; `fill` is the light badge background.
export const FAMILY_COLOR: Record<Family, { accent: string; fill: string }> = {
	major: { accent: '#e0a106', fill: '#fbf0d2' },
	mode: { accent: '#2a9d8f', fill: '#d8f0ec' },
	minor: { accent: '#4f5bd5', fill: '#e1e3fb' },
	pentatonic: { accent: '#2e9e6b', fill: '#d8f0e3' },
	blues: { accent: '#3d6fb0', fill: '#dbe7f5' },
	symmetric: { accent: '#8e5bc4', fill: '#ece1f7' },
	world: { accent: '#c0392b', fill: '#f7ddda' },
	jazz: { accent: '#b5398a', fill: '#f6daed' },
	generated: { accent: 'transparent', fill: 'transparent' }
};
