import Users from "../models/userModel.js";

const loginBodyValidator = async (body?: Record<any, any> | null) => {
    // Validate the user data
    if (!body || !body?.email || !body?.passwordHash) {
        throw {
            message: "Bad Request",
            status: 400,
        };
    }

    // Get the user data from request body
    const { email, passwordHash } = body;

    // Check if the user exists in array
    const userInfo = Users.find((x) => x.email === email);
    if (!userInfo) {
        throw { message: "User does not exist", status: 401 };
    }

    // Check if the passwordHash is correct
    if (userInfo.passwordHash !== passwordHash) {
        throw { message: "Incorrect password", status: 401 };
    }

    return userInfo;
};

export default loginBodyValidator;
