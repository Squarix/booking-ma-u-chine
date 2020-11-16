export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string,
    type: UserTypes,
}

enum UserTypes {
    moderator = 'moderator',
    user = 'user',
}
