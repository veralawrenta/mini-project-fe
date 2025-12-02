import { User } from "./user";

export enum Category {
    ENTERTAINMENT = "ENTERTAINMENT",
    EDUCATION = "EDUCATION",
    SPORT = "SPORT",
    BUSINESS = "BUSINESS",
    ART = "ART",
}

export enum City {
    JAKARTA = "JAKARTA",
    MEDAN = "MEDAN",
    YOGYAKARTA = "YOGYAKARTA",
    DENPASAR = "DENPASAR",
    LOMBOK = "LOMBOK",
    TIMIKA = "TIMIKA",
}

export enum VenueType {
    FREE = "FREE",
    PAID = "PAID",
}

export interface Events {
    id: string;
    title: string;
    description: string;
    date: Date;
    startTime?: string;
    endTime?: string;
    category: Category;
    city: City;
    venueType: VenueType;
    venue: string;
    address: string;
    banner: string;
    availableSeats: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    organizer : User;
}