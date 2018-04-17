import { World } from '../world';
import MapChip from './map-chip';

export type MapChipDefinitions = {
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
const mapChipDefinitions: { [chipId: number]: MapChipDefinitions } = {
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
		onEnter: (world, x, y) => {
			// TODO 鍵所持処理
			world.setTile(x, y, MapChip.Floor);
		},
	},
	[MapChip.Door]: {
		// TODO
	},
	[MapChip.Chest]: {
		obstacle: true,
		// TODO
	},
};

export default mapChipDefinitions;
