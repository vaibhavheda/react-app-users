import { Input, Paper } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Authorization from "../model/authorizationKey";
import User from "../model/user";
import { storeActions } from "../utils/actions";
import { StateOfApp } from "../utils/reducer";
import AuthorizeComp from "./AuthorizeComp";
import { create_UUID } from "../utils/functions";
import "./styles/mainfile.scss";

interface IUserFormInteface {
	first: string;
	last: string;
	authorization: string;
	permissions: Authorization[];
	isEditMode: boolean;
	selectedEditId?: string;
}

const UserForm = (props: IUserFormInteface) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="mainform">
			<h1 className="ceter">
				{(props.isEditMode ? "Edit " : "New ") + "Form"}
			</h1>
			<Paper className="mainform-inner" elevation={10}>
				<div className="InputField">
					<span>First Name &nbsp;</span>
					<Input
						disabled={props.isEditMode}
						value={props.first}
						name={"last"}
						onChange={(e) => {
							dispatch(storeActions.setFirstName(e.target.value));
						}}
					/>
				</div>
				<div className="InputField">
					<span>Last Name &nbsp;</span>
					<Input
						disabled={props.isEditMode}
						value={props.last}
						name={"last"}
						onChange={(e) => {
							dispatch(storeActions.setLastName(e.target.value));
						}}
					/>
				</div>
				<div className="InputField authorizations">
					<span>Authorizations</span>
					<AuthorizeComp
						isEditMode={props.isEditMode}
					></AuthorizeComp>
				</div>
				{!props.isEditMode && (
					<div>
						<button
							className="button"
							onClick={() => {
								if (props.isEditMode === false) {
									let newUser = new User(
										create_UUID(),
										props.first,
										props.last,
										props.authorization,
										props.permissions
									);
									fetch("http://localhost:3001/new-user", {
										method: "post",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify(newUser),
									})
										.then((res) => res.json())
										.then((user) => {
											dispatch(
												storeActions.revertToPrevious()
											);
											navigate("/");
										});
								}
							}}
						>
							Save
						</button>
						<button
							className="button"
							onClick={() => {
								if (props.isEditMode === false) {
									dispatch(storeActions.revertToPrevious());
									navigate("/");
								}
							}}
						>
							Cancel
						</button>
					</div>
				)}
			</Paper>
		</div>
	);
};

const mapStateToProps = (
	state: StateOfApp,
	ownProps: any
): IUserFormInteface => {
	const { isEditMode } = ownProps;

	return {
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
				? state.selectedEntity.authorizations
				: state.permissions,
		isEditMode: isEditMode,
		selectedEditId: state.selectedEditId,
	};
};

export default connect(mapStateToProps)(memo(UserForm));
