type userDataType = {
    _id: string,
    email: string,
    password: string,
    role: string
};

declare global {
    var idArray: string[],
    var _id: string,
    var email: string,
    var password: string,
    var role: string
}

export {};