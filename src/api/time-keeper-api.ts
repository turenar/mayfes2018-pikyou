declare var TIME_KEEPER_API_BASE: string | undefined;

const timeKeeperTokenStorageKey = 'timekeeper';

export const enum TimeKeeperState {
	NONE,
	RECOMMEND,
	FORCED,
	LEAVED,
}

export default class TimeKeeperApi {
	private token: string;

	public constructor(token: string) {
		this.token = token;
	}

	public static tryCreateInstance() {
		if (TIME_KEEPER_API_BASE === undefined) {
			// TimeKeeperは無効
			console.log({ TimeKeeper: 'disabled' });
			return null;
		} else {
			const token = localStorage.getItem(timeKeeperTokenStorageKey);
			if (!token) {
				console.log({ TimeKeeper: 'no token' });
				this.getToken();
				return null;
			} else {
				console.log({ TimeKeeper: 'enabled' });
				return new TimeKeeperApi(token);
			}
		}
	}

	public ping(): Promise<TimeKeeperState | null> {
		return fetch(TimeKeeperApi.getUri(`/api/ping/${this.token}`), {
			headers: { 'Content-Type': 'application/json' },
		})
			.then(response => response.json())
			.then(json => {
				if (json.meta.status === 200) {
					return json.attendance.state;
				} else {
					return null;
				}
			});
	}

	private static getUri(path: string) {
		return TIME_KEEPER_API_BASE && `${TIME_KEEPER_API_BASE}/${path}`;
	}

	private static getToken() {
		const seatNumber = window.prompt('席番号を入力してください。');
		fetch(this.getUri('/api/attend'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ seat_number: seatNumber }),
		})
			.then(response => response.json())
			.then(json => {
				if (json.meta.status === 200) {
					localStorage.setItem(timeKeeperTokenStorageKey, json.computer.computer_hash);
					location.reload();
				} else {
					window.alert(json.meta.error);
				}
			})
			.catch(err => {
				window.alert('エラーが発生');
				console.error(err);
				throw err;
			});
	}
}
