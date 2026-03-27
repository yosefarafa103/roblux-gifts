interface ResponseType {
    data: Player[]
};
interface Player {
    hasVerifedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}

export { type ResponseType }