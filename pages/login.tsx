import {
	Alert,
	AlertIcon,
	Box,
	Button,
	chakra,
	FormControl,
	Input,
	Text,
	useToast
} from "@chakra-ui/react";
import CenterContainer from "@components/CenterContainer";
import PasswordInput from "@components/PasswordInput";
import useUser from "@util/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Login() {
	const { login, currentUser, config } = useUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const toast = useToast();

	useEffect(() => {
		if (loading) return;
		if (currentUser && config) {
			router.push("/");
		} else if (currentUser) {
			router.push("/creds");
		}
	}, [currentUser, config, loading]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(email, password);
			toast({
				title: "Success",
				description: "You have successfully logged in.",
				status: "success",
				duration: 3000,
				isClosable: true
			});
		} catch (err) {
			setError(err.message.replace("Firebase: ", ""));
		} finally {
			setLoading(false);
		}
	};

	return (
		<CenterContainer>
			<Box
				w="sm"
				px="6"
				py="8"
				borderRadius="md"
				boxShadow="4.1px 4.1px 6.5px -1.7px rgba(0,0,0,0.2)"
			>
				<Text as="h2" fontSize="2xl" align="center" mb="8">
					👋 Login
				</Text>
				{error && (
					<Alert status="error" fontSize="md">
						<AlertIcon />
						{error}
					</Alert>
				)}
				<Box as="form" onSubmit={handleSubmit}>
					<FormControl id="email" my="3">
						<Input
							variant="outline"
							placeholder="Enter your email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</FormControl>
					<FormControl id="password" mb="3">
						<PasswordInput
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<Button
						mb="3"
						colorScheme="green"
						variant="solid"
						isLoading={loading}
						w="full"
						type="submit"
					>
						Login
					</Button>
					<Text as="p" fontSize="xs">
						Don't have an account?{" "}
						<Link href="/signup">
							<chakra.span textDecor="underline" cursor="pointer">
								Sign Up
							</chakra.span>
						</Link>
					</Text>
				</Box>
			</Box>
		</CenterContainer>
	);
}