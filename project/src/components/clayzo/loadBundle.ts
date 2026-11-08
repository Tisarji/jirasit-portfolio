import { readClayzoBundle, type LoadedClayzo } from "@clayzo/animation/bundle";

/**
 * One in-flight request per URL, shared by every player that wants it. Six
 * SectionRules mount with the page; without this they issue six round trips
 * and six parses for the same bytes before the reader has scrolled anywhere.
 */
const inFlight = new Map<string, Promise<LoadedClayzo>>();

export function loadBundle(url: string): Promise<LoadedClayzo> {
	let pending = inFlight.get(url);
	if (!pending) {
		pending = fetch(url)
			.then((response) => response.arrayBuffer())
			.then((bytes) => readClayzoBundle(new Uint8Array(bytes)));
		// A rejection must not be cached, or one flaky load disables the piece
		// for the rest of the session.
		pending.catch(() => inFlight.delete(url));
		inFlight.set(url, pending);
	}
	return pending;
}

/** Test seam. */
export function __resetBundleCache(): void {
	inFlight.clear();
}
