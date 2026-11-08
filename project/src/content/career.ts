export type Tenure = {
	startYear: number;
	startMonth: number;
	endYear?: number;
	endMonth?: number;
};

export type Involvement = {
	name: string;
	summary: string;
	plainDescription: string;
	role: string;
	methodology: string;
	tech: string[];
	action?: { label: string; href: string; type: "website" | "email" };
};

export type Role = {
	company: string;
	industry: string;
	title: string;
	location: string;
	arrangement: string;
	tenure: Tenure;
	current: boolean;
	plainEnglish: string;
	involvements: Involvement[];
	skills: string[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Whole months from the start of a tenure to its end, or to `now` while it is open. */
export function formatTenure(tenure: Tenure, now: Date = new Date()): string {
	const endYear = tenure.endYear ?? now.getFullYear();
	const endMonth = tenure.endMonth ?? now.getMonth() + 1;
	const months = (endYear - tenure.startYear) * 12 + (endMonth - tenure.startMonth);

	if (months < 0) return "Not started";
	if (months === 0) return "Less than a month";

	const years = Math.floor(months / 12);
	const remainder = months % 12;
	const parts: string[] = [];
	if (years > 0) parts.push(`${years} year${years === 1 ? "" : "s"}`);
	if (remainder > 0) parts.push(`${remainder} month${remainder === 1 ? "" : "s"}`);
	return parts.join(" ");
}

export function formatTenureRange(tenure: Tenure): string {
	const start = `${MONTHS[tenure.startMonth - 1]} ${tenure.startYear}`;
	const end =
		tenure.endYear && tenure.endMonth
			? `${MONTHS[tenure.endMonth - 1]} ${tenure.endYear}`
			: "Present";
	return `${start} – ${end}`;
}

export const ROLES: Role[] = [
	{
		company: "Vbreathe",
		industry: "Software & Firmware",
		title: "Software and Firmware Engineer",
		location: "Bangkok, Thailand",
		arrangement: "On-site",
		tenure: { startYear: 2026, startMonth: 10 },
		current: true,
		plainEnglish:
			"I build across the whole stack here — a web platform that audits company financial statements, a card platform with an app people have installed, and the device-side code behind Vbreathe's own product. Some days that means React; some days it means C.",
		involvements: [
			{
				name: "Audit Workspace (Nex)",
				summary: "Checking a company's books against the rulebook",
				plainDescription:
					"Auditors have to prove a company's financial statements follow Hong Kong's reporting standards (HKFRS) — line by line, rule by rule. This platform rebuilds the statements from the raw ledger, compares them against the draft the client sent, and points at the lines the draft is missing. An AI layer then reads each requirement in the standard and answers it with a reason that cites the rule by number, so a human can check the reasoning rather than take the answer on faith. I work the full loop, from the ledger import to the final report.",
				role: "Full Loop Developer",
				methodology: "Agile",
				tech: ["Next.js", "NestJS", "PostgreSQL", "LLM / RAG", "AWS"],
			},
			{
				name: "CardLight",
				summary: "One app for cards that usually live in a drawer",
				plainDescription:
					"A one-stop card platform — a mobile app that is live on Google Play, plus an admin console for the team that runs it, with an AI layer behind both. I build features across the app and the services underneath it.",
				role: "Developer",
				methodology: "Agile Scrum",
				tech: ["React Native", "NestJS", "PostgreSQL", "AWS Bedrock"],
			},
			{
				name: "Vbreathe App",
				summary: "The code that runs on the device itself",
				plainDescription:
					"Firmware for Vbreathe's own product and the app that talks to it. This is my newest ground and the smallest slice of my week so far.",
				role: "Firmware Contributor",
				methodology: "Agile",
				tech: ["C", "Embedded", "Mobile"],
			},
		],
		skills: ["Full-Stack", "Firmware", "LLM / RAG", "System Design", "AWS"],
	},
	{
		company: "Sati Co., Ltd.",
		industry: "Healthcare AI",
		title: "Software Engineer",
		location: "Chiang Mai, Thailand",
		arrangement: "On-site",
		tenure: { startYear: 2025, startMonth: 6, endYear: 2026, endMonth: 8 },
		current: false,
		plainEnglish:
			"I built full-stack web applications for a healthcare-AI company — from the first idea on a whiteboard, through the design, all the way to a live product people used every day. I joined as an intern and left as a software engineer.",
		involvements: [
			{
				name: "Internal ERP System",
				summary: "The control panel for company operations",
				plainDescription:
					"A private web app where the company manages employees, tracks working hours, sets goals (KPIs), and monitors system health — all from one dashboard. I designed and built it end-to-end as the sole developer.",
				role: "Sole Developer",
				methodology: "Waterfall",
				tech: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Ant Design"],
				action: {
					type: "email",
					label: "Request a demo",
					href: "mailto:jirasitkarunwong@gmail.com?subject=ERP%20Demo%20Request&body=Hi%20Jirasit,%0A%0AI%E2%80%99d%20love%20to%20see%20a%20demo%20of%20the%20ERP%20system.%0A%0AThanks!",
				},
			},
			{
				name: "Discharge Summary",
				summary: "Helping hospitals write patient reports faster",
				plainDescription:
					"A medical platform that streamlines the paperwork doctors write when a patient is discharged from the hospital. I joined as a team member — reviewing code, fixing bugs, and shipping new features alongside senior engineers.",
				role: "Team Member",
				methodology: "Agile Scrum",
				tech: ["NestJS", "React", "PostgreSQL", "Python", "MUI"],
			},
			{
				name: "Company Landing Page",
				summary: "The public website visitors see first",
				plainDescription:
					"Sati's public-facing marketing site — showcasing their AI healthcare products. I translated the Figma design into a responsive, polished site that works seamlessly on any screen size.",
				role: "Developer",
				methodology: "Agile",
				tech: ["Next.js", "MUI", "Figma"],
				action: {
					type: "website",
					label: "Visit website",
					href: "https://www.sati.co.th/",
				},
			},
		],
		skills: ["Full-Stack", "System Design", "Database Design", "ERP", "Project Management"],
	},
];
