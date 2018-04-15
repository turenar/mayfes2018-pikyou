import { World } from '../world';
import MapChip from './map-chip';

export type MapchipDefinitions = {
	obstacle?: boolean;
	onAction?: (world: World, x: number, y: number) => void;
	onEnter?: (world: World, x: number, y: number) => void;
};

/**
 *
 * FIXME typeなどの埋め込み？
 * @return {MapchipDefinitions} definition
 */
function markerBase() {
	return { obstacle: false };
}

// chipId should be [T in MapChip] but i don't know how
const mapChipDefinitions: { [chipId: number]: MapchipDefinitions } = {
	[MapChip.Empty]: {},
	[MapChip.Wall]: {
		obstacle: true,
	},
	[MapChip.Floor]: {},
	[MapChip.Goal]: {
		onEnter: world => {
			world.goal();
		},
	},
	[MapChip.MarkRed]: markerBase(),
	[MapChip.MarkBlue]: markerBase(),
	[MapChip.MarkGreen]: markerBase(),
	[MapChip.MarkYellow]: markerBase(),
	[MapChip.Pitfall]: {
		obstacle: false,
		onEnter: world => {
			world.die();
		},
	},
	[MapChip.Key]: {
		// TODO
	},
	[MapChip.Door]: {
		obstacle: true,
		// TODO
	},
	[MapChip.Chest]: {
		obstacle: true,
		// TODO
	},
};

export default mapChipDefinitions;
