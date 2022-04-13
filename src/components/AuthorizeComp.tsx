import { MenuItem, Select } from "@mui/material";
import { memo } from "react";
import { connect, useDispatch } from "react-redux";
import Authorization from "../model/authorizationKey";
import User from "../model/user";
import { storeActions } from "../utils/actions";
import { saveDataDirectlyToDB } from "../utils/functions";
import { StateOfApp } from "../utils/reducer";
import LoadingScreen from "./loading";

import "./styles/mainfile.scss";

interface IUserFormInteface {
	first: string;
	last: string;
	authorization: string;
	permissions: Authorization[];
	isEditMode: boolean;
	loading: boolean;
	selectedEntity?: User;
}

const groupOptions = ["Operator", "Administrator", "Service"];
const userPermissions = ["jumping", "standing", "sitting", "running"];

const AuthorizationComp = (props: IUserFormInteface) => {
	const dispatch = useDispatch();

	const { permissions } = props;

	return (
		<div className="authorizeWrapper">
			{props.loading ? (
				<LoadingScreen />
			) : (
				<div>
					<div className="InputField">
						<span>Groups</span>
						<Select
							labelId="group-drop-down"
							id="group-drop"
							value={props.authorization}
							onChange={(e) => {
								if (props.isEditMode) {
									const newUser = new User(
										props.selectedEntity?.getUUID() !==
										undefined
											? props.selectedEntity?.getUUID()
											: "",
										props.first,
										props.last,
										e.target.value,
										props.permissions
									);
									saveDataDirectlyToDB(
										newUser,
										props.selectedEntity?.getUUID() !==
											undefined
											? props.selectedEntity?.getUUID()
											: ""
									);
									dispatch(
										storeActions.setSelectedEntity(newUser)
									);
								} else {
									dispatch(
										storeActions.setAuthorizationGroup(
											e.target.value
										)
									);
								}
							}}
						>
							{groupOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className="InputField checkboxwrapper">
						<span>Permissions</span>
						{userPermissions.map((per) => (
							<div key={per} className={"checkbox"}>
								<input
									type="checkbox"
									id={per}
									name={per}
									value={per}
									checked={
										permissions.find(
											(val) =>
												val.getAuthorizationKey === per
										)?.getGranted
									}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										if (props.isEditMode) {
											const newPerm =
												props.permissions.filter(
													(per) =>
														per.getAuthorizationKey !==
														e.target.value
												);
											newPerm.push(
												new Authorization(
													e.target.value,
													e.target.checked
												)
											);
											const newUser = new User(
												props.selectedEntity?.getUUID() !==
												undefined
													? props.selectedEntity?.getUUID()
													: "",
												props.first,
												props.last,
												props.authorization,
												newPerm
											);
											saveDataDirectlyToDB(
												newUser,
												props.selectedEntity?.getUUID() !==
													undefined
													? props.selectedEntity?.getUUID()
													: ""
											);
											dispatch(
												storeActions.setSelectedEntity(
													newUser
												)
											);
										} else {
											dispatch(
												storeActions.setPermissions(
													new Authorization(
														per,
														e.target.checked
													),
													per
												)
											);
										}
									}}
								/>
								<label> {per}</label>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (
	state: StateOfApp,
	ownProps: any
): IUserFormInteface => {
	const { isEditMode } = ownProps;

	return {
		loading: state.loading,
		first:
			isEditMode && state.selectedEntity !== undefined
				? state.selectedEntity.getFirstName()
				: state.first,
		last:
			isEditMode && state.selectedEntity !== undefined
				? state.selectedEntity.getLastName()
				: state.last,
		authorization:
			isEditMode && state.selectedEntity !== undefined
				? state.selectedEntity.getUserGroup()
				: state.authorization,
		permissions:
			isEditMode && state.selectedEntity !== undefined
				? state.selectedEntity.getAuthorizations()
				: state.permissions,
		isEditMode: isEditMode,
		selectedEntity: state.selectedEntity,
	};
};

export default connect(mapStateToProps)(memo(AuthorizationComp));
