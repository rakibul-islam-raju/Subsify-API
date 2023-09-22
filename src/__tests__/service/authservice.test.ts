import autherService from "../../lib/auth";

describe("auth", () => {
	describe("login", () => {
		it("should login successfully with valid credentials", async () => {
			const email = "test@example.com";
			const password = "password";

			const tokens = await autherService.login(email, password);

			expect(tokens).toHaveProperty("access_token");
			expect(tokens).toHaveProperty("refresh_token");
		});

		it("should throw an error if the user does not exist", async () => {
			const email = "non-existent-user@example.com";
			const password = "password";

			await expect(autherService.login(email, password)).rejects.toThrowError(
				new Error("Invalid Credentials")
			);
		});

		it("should throw an error if the password is incorrect", async () => {
			const email = "test@example.com";
			const password = "incorrect-password";

			await expect(autherService.login(email, password)).rejects.toThrowError(
				new Error("Invalid Credentials")
			);
		});
	});

	describe("refresh", () => {
		it("should refresh the tokens successfully with a valid refresh token", async () => {
			const refreshToken = "valid-refresh-token";

			const tokens = await autherService.refresh(refreshToken);

			expect(tokens).toHaveProperty("access_token");
			expect(tokens).toHaveProperty("refresh_token");
		});

		it("should throw an error if the refresh token is invalid", async () => {
			const refreshToken = "invalid-refresh-token";

			await expect(autherService.refresh(refreshToken)).rejects.toThrowError(
				new Error("Invalid refresh token")
			);
		});

		it("should throw an error if the user does not exist for the refresh token", async () => {
			const refreshToken = "refresh-token-for-non-existent-user";

			await expect(autherService.refresh(refreshToken)).rejects.toThrowError(
				new Error("Invalid refresh token")
			);
		});
	});
});
