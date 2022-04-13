import { response } from "express";
import User, { toUserData } from "../model/user";
import { storeActions } from "../utils/actions";

export const fetchData = () => {
	return async (dispatch: any) => {
		dispatch(storeActions.loadingBegin());
		fetch("http://localhost:3001/")
			.then((response) => response.json())
			.then((res) => {
				console.table(res);
				// console.log(res);
				dispatch(storeActions.loadingSuccess(toUserData(res)));
			});
	};
};

// export const fetchDataById = (idV?: string) => {
// 	const requestOptions = {
// 		method: "GET",
// 		headers: { "Content-Type": "application/json", id: idV },
// 	};
// 	return async (dispatch: any) => {
// 		dispatch(storeActions.loadingBegin());
// 		fetch(`http://localhost:3001/edit-user`, requestOptions)
// 			.then((response) => response.json())
// 			.then((res) => {
// 				console.log(idV;
// 				dispatch(storeActions.setSelectedEntity(toUserData([res])[0]));
// 			});
// 	};
// };

export const saveData = (data: User) => {
	return async (dispatch: any) => {};
};
