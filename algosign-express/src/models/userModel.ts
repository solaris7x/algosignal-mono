export interface UserModel {
    username: string;
    email: string;
    passwordHash: string;
}

const Users: UserModel[] = [];

// const UserModel = mongoose.model("Users", UserModelSchema);
export default Users;
