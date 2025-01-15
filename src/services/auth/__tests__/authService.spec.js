const { registerUser, loginUser } = require("../auth.service");
const User = require("../../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promiseReturnResult } = require("../../../utils/common/promiseHelper");
const { findUserByUserName } = require("../../../repositories/auth/user.repository");
const { isUserMatched } = require("../../../utils/auth/authentication.util");
const APP_CONFIGS = require("../../../config/app.config");

jest.mock("../../../models/user.model");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../../../utils/common/promiseHelper");
jest.mock("../../../repositories/auth/user.repository");
jest.mock("../../../utils/auth/authentication.util");

describe("Auth Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("registerUser", () => {
        it("should register a new user and return a success response", async () => {
            const mockRequestBody = {
                username: "testuser",
                password: "password123",
                role: "user",
                email: "testuser@example.com",
            };

            const hashedPassword = "hashedpassword123";
            const mockUser = {
                username: mockRequestBody.username,
                password: hashedPassword,
                role: mockRequestBody.role,
                email: mockRequestBody.email,
                save: jest.fn().mockResolvedValue(true),
            };
            const mockApiResponse = {
                success: true,
                data: { user: mockUser },
                message: "Successfully user created!",
            };

            bcrypt.hash.mockResolvedValue(hashedPassword);
            User.mockImplementation(() => mockUser);
            promiseReturnResult.mockReturnValue(mockApiResponse);

            const result = await registerUser(mockRequestBody);

            expect(bcrypt.hash).toHaveBeenCalledWith(mockRequestBody.password, 10);
            expect(User).toHaveBeenCalledWith({
                username: mockRequestBody.username,
                password: hashedPassword,
                role: mockRequestBody.role,
                email: mockRequestBody.email,
            });
            expect(mockUser.save).toHaveBeenCalled();
            expect(promiseReturnResult).toHaveBeenCalledWith(true, { user: mockUser }, "Successfully user created!");
            expect(result).toEqual(mockApiResponse);
        });

        it("should handle errors and return a failure response", async () => {
            const mockRequestBody = { username: "testuser" };
            const mockError = new Error("Database error");
            const mockApiResponse = {
                success: false,
                data: {},
                error: mockError,
                message: "Failed registering user!",
            };

            bcrypt.hash.mockRejectedValue(mockError);
            promiseReturnResult.mockReturnValue(mockApiResponse);

            const result = await registerUser(mockRequestBody);

            expect(bcrypt.hash).toHaveBeenCalledWith(mockRequestBody.password, 10);
            expect(promiseReturnResult).toHaveBeenCalledWith(false, {}, mockError, "Failed registering user!");
            expect(result).toEqual(mockApiResponse);
        });
    });

    describe("loginUser", () => {
        it("should login a user and return a token", async () => {
            const mockRequestBody = {
                username: "testuser",
                password: "password123",
            };
            const mockUser = {
                _id: "user123",
                role: "user",
                email: "testuser@example.com",
            };
            const mockToken = "jsonwebtoken123";
            const mockApiResponse = {
                success: true,
                data: { success: true, token: mockToken },
                message: "Login success!",
            };

            findUserByUserName.mockResolvedValue({ status: true, data: mockUser });
            isUserMatched.mockResolvedValue(true);
            jwt.sign.mockReturnValue(mockToken);
            promiseReturnResult.mockReturnValue(mockApiResponse);

            const result = await loginUser(mockRequestBody);

            expect(findUserByUserName).toHaveBeenCalledWith(mockRequestBody.username);
            expect(isUserMatched).toHaveBeenCalledWith(mockUser, mockRequestBody.password);
            expect(jwt.sign).toHaveBeenCalledWith(
                { user_id: mockUser._id, role: mockUser.role, email: mockUser.email },
                APP_CONFIGS.SECRETS_KEY.JWT_SECRET,
                { expiresIn: APP_CONFIGS.SECRETS_KEY.JWT_EXPIRES_IN }
            );
            expect(promiseReturnResult).toHaveBeenCalledWith(true, { success: true, token: mockToken }, "Login success!");
            expect(result).toEqual(mockApiResponse);
        });

        it("should handle invalid credentials and return a failure response", async () => {
            const mockRequestBody = {
                username: "testuser",
                password: "wrongpassword",
            };
            const mockUser = {
                _id: "user123",
                role: "user",
                email: "testuser@example.com",
            };
            const mockApiResponse = {
                success: false,
                data: {},
                error: {},
                message: "Failed login, Credential is invalid!",
            };

            findUserByUserName.mockResolvedValue({ status: true, data: mockUser });
            isUserMatched.mockResolvedValue(false);
            promiseReturnResult.mockReturnValue(mockApiResponse);

            const result = await loginUser(mockRequestBody);

            expect(findUserByUserName).toHaveBeenCalledWith(mockRequestBody.username);
            expect(isUserMatched).toHaveBeenCalledWith(mockUser, mockRequestBody.password);
            expect(promiseReturnResult).toHaveBeenCalledWith(false, {}, {}, "Failed login, Credential is invalid!");
            expect(result).toEqual(mockApiResponse);
        });

        it("should handle errors and return a failure response", async () => {
            const mockRequestBody = { username: "testuser" };
            const mockError = new Error("Unexpected error");
            const mockApiResponse = {
                success: false,
                data: {},
                error: mockError,
                message: mockError.message,
            };

            findUserByUserName.mockRejectedValue(mockError);
            promiseReturnResult.mockReturnValue(mockApiResponse);

            const result = await loginUser(mockRequestBody);

            expect(findUserByUserName).toHaveBeenCalledWith(mockRequestBody.username);
            expect(promiseReturnResult).toHaveBeenCalledWith(false, {}, mockError, mockError.message);
            expect(result).toEqual(mockApiResponse);
        });
    });
});
