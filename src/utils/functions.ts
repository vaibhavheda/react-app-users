import User from "../model/user";

export function create_UUID() {
	var dt = new Date().getTime();
	var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
	return uuid;
}

export const saveDataDirectlyToDB = (newUser: User, id: string) => {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json", id: id },
		body: JSON.stringify(newUser),
	};
	fetch(`http://localhost:3001/edit-user`, requestOptions)
		.then((res) => res.json())
		.then(console.log);
};
