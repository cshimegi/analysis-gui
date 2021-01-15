export class User {
    id        : bigint;
    name      : string;
    email     : string;
    authority : number;
    token     : string;
}

export class PartialUser {
    id            : bigint;
    username      : string;
    email         : string;
    authority     : number;
    authorityName : string;
}

export class UserLog {
    id         : bigint;
    user       : PartialUser;
    loggedTime : string;
}