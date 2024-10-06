import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../styles/PageLayout";
import Logo from "../../ui/Logo";
import { useResetPassword } from "./useResetPassword";
import { useUser } from "./useUser";

export default function ResetPassword() {
	const { user } = useUser();
	const navigate = useNavigate();

	if (user) navigate("/events");

	const { resetPassword, isLoading } = useResetPassword();

	const [formData, setFormData] = useState({
		password: "",
		passwordConfirm: "",
	});

	function handleSubmit(e) {
		e.preventDefault();
		resetPassword(formData);
	}

	function handleChange(e) {
		const { id, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [id]: value }));
	}

	return (
		<PageLayout>
			<div className="flex flex-col w-[600px] mx-auto items-center bg-primary-50 p-8 rounded-lg shadow-md">
				<Logo />
				<h1 className="mt-4 text-4xl font-bold text-primary-900">
					CampusUnify
				</h1>
				<p className="mt-2 font-semibold text-primary-900">
					Reset Your Password
				</p>

				<form
					onSubmit={(e) => handleSubmit(e)}
					className="mt-4 flex flex-col gap-4 w-full"
				>
					<input
						type="password"
						placeholder="Password"
						id="password"
						required
						className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
						onChange={handleChange}
						value={formData.password}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						id="passwordConfirm"
						required
						className="border p-3 rounded-lg placeholder-primary-900 w-full text-primary-900"
						onChange={handleChange}
						value={formData.passwordConfirm}
					/>
					<Link to="/login" className="text-sm underline text-primary-900">
						Remember Password?
					</Link>
					<button
						type="submit"
						disabled={isLoading}
						className="bg-primary-600 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
						onClick={(e) => handleSubmit(e)}
					>
						Reset Password
					</button>
				</form>

				<Link to="/signup" className="mt-4 text-primary-900 underline text-sm">
					Don&apos;t have an account?
				</Link>
			</div>
		</PageLayout>
	);
}
