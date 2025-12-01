export enum Role {
    ORGANIZER = "ORGANIZER",
    CUSTOMER = "CUSTOMER"
}
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: Role
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}