import { ModeEditOutline } from "@mui/icons-material";
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
} from "@mui/material";
import { memo, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../model/user";
import { fetchData } from "../service/preflight";
import { storeActions } from "../utils/actions";
import { StateOfApp } from "../utils/reducer";
import LoadingScreen from "./loading";

import "./styles/dashboard.scss";

const Dashboard = (props: any) => {
	const { userData } = props;
	const tableColums = ["First Name", "Last Name", "Actions"];
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	return (
		<div>
			{props.loading ? (
				<LoadingScreen />
			) : (
				<TableContainer className="table-wrapper" component={Paper}>
					<Table className="mainTable">
						<TableHead className="table-head">
							<TableRow>
								{tableColums.map((columnName, index) => {
									return (
										<TableCell
											className="tableCell"
											key={index}
										>
											{columnName}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{userData.length !== 0 ? (
								userData.map((user: User) => {
									return (
										<TableRow key={user.getUUID()}>
											<TableCell
												align="left"
												className="tableCell"
											>
												{user.getFirstName()}
											</TableCell>
											<TableCell
												className="tableCell"
												align="left"
											>
												{user.getLastName()}
											</TableCell>

											<TableCell className="tableCell">
												<IconButton
													className="tableCell"
													aria-label="edit"
													onClick={() => {
														dispatch(
															storeActions.setSelectedId(
																user.getUUID(),
																user
															)
														);
														navigate("/edit-user");
													}}
												>
													<ModeEditOutline />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})
							) : (
								<></>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	);
};
const mapStateToProps = (state: StateOfApp) => {
	return {
		userData: state.data,
		loading: state.loading,
	};
};
export default connect(mapStateToProps)(memo(Dashboard));
