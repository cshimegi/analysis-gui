export class User {
    id        : bigint;
    name      : string;
    email     : string;
    isStaff   : boolean;
    token     : string;
}

export class PartialUser {
    id            : bigint;
    username      : string;
    email         : string;
    isStaff       : boolean;
    authorityName : string;
}

export class UserLog {
    id         : bigint;
    user       : PartialUser;
    loggedTime : string;
}