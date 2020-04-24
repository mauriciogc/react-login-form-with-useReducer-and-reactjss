import React, { useReducer } from "react";
import { createUseStyles } from "react-jss";
import Loading from "./Loading";
import { noEmptyFields } from "../Helpers/helper";

const useStyle = createUseStyles({
	container: {
		fontSize: "15px",
		margin: "auto",
		padding: "1rem ",
		background: "#FFF",
		boxShadow: "0 3px 10px #CBCBCB",
		color: "#474747",
		width: "300px",
	},
	fileInput: {
		background: "#EEEEEE",
		boxSizing: "border-box",
		padding: "0 0.5rem",
		margin: "1rem 0",
	},
	text: {
		color: "#737373",
		outline: "none",
		fontSize: "1rem",
		width: "100%",
		height: "3rem",
		background: "transparent",
		border: "0px",
		"&::placeholder": {
			color: "#C7C7C7",
		},
	},
	button: {
		outline: "none",
		padding: "0.5rem",
		fontSize: "1rem",
		border: "0px solid",
		borderRadius: "0.3rem",
		color: "white",
		background: "#5B9AF9",
		cursor: "pointer",
		"&:hover": { background: "#3C6BAF" },
		"&:active": { background: "#5B9AF9" },
		"&[disabled]": {
			opacity: 0.3,
		},
	},
	message: {
		fontWeight: 300,
	},
	failure: {
		composes: "$message",
		color: "#a00000",
	},
	success: {
		composes: "$message",
		color: "#5DBC1D",
	},
});

const initialArguments = {
	data: {
		user: "",
		password: "",
	},
	loading: false,
	isValid: false,
	status: null,
	message: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "ENTER_DATA": {
			const { name, value } = action.field;
			const data = { ...state.data, [name]: value };
			const isValid = noEmptyFields(data);
			return {
				...state,
				data,
				isValid,
				message: null,
			};
		}
		case "UPDATE_STATUS": {
			const { loading } = action;
			return {
				...state,
				status: "VERIFYING",
				message: null,
				response: null,
				loading,
			};
		}
		case "SUCCESS": {
			const { data: response, loading } = action;

			return {
				...state,
				status: "READY",
				message: response.message,
				response,
				loading,
			};
		}
		case "FAILURE": {
			const { data: response, loading } = action;

			return {
				...state,
				status: "ERROR",
				message: response.message,
				response: null,
				loading,
			};
		}
		default:
			break;
	}
};

const Form = () => {
	const [form, dispatch] = useReducer(reducer, initialArguments);
	const classes = useStyle();

	const handleChange = (e) =>
		dispatch({
			type: "ENTER_DATA",
			field: {
				name: e.target.name,
				value: e.target.value,
			},
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_STATUS", loading: true });

		setTimeout(() => {
			dispatch({
				type: "SUCCESS",
				data: {
					//Data ....
					message: "You're going to get redirected in a second",
				},
				loading: false,
			});

			/*dispatch({
				type: "FAILURE",
				data: {
					//Data ....
					message: "Incorrect credentials. Please try again!",
				},
				loading: false,
			});*/
		}, 2000);
	};

	return (
		<div className={classes.container}>
			<form>
				<h1>Login</h1>
				<div className={classes.fileInput}>
					<input
						type="text"
						name="user"
						placeholder="User"
						onChange={handleChange}
						className={classes.text}
					/>
				</div>
				<div className={classes.fileInput}>
					<input
						type="password"
						name="password"
						placeholder="Password"
						onChange={handleChange}
						className={classes.text}
					/>
				</div>
				{form.message && <h4 className={classes.message}>{form.message}</h4>}
				{form.loading ? (
					<Loading />
				) : (
					<button
						onClick={handleSubmit}
						disabled={!form.isValid}
						className={classes.button}
					>
						Submit
					</button>
				)}
			</form>
		</div>
	);
};

export default Form;
