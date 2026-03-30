import type { SetStateAction } from "react";

interface ResponseType {
    data: Player
    avatarImg: { data: AvatarImg[] }
};
interface AvatarImg {
    targetId: number;
    state: string;
    imageUrl: string;
    version: string;
}
interface Player {
    hasVerifedBadge?: boolean;
    id: number;
    name: string;
    displayName: string;
    userImg?: string
}
interface DialogUser {
    username: string;
    setUsername: React.Dispatch<SetStateAction<string>>;
    filterdUsers: {
        id: number;
        name: string;
        displayName: string;
    }[];
    foundedUser: {
        userImg: string;
        hasVerifedBadge?: boolean | undefined;
        id: number;
        name: string;
        displayName: string;
    };
    isLoading: boolean;
    isPending: boolean;
    data: ResponseType;
    debouncedValue: string;
}
export type User = Player
export type { ResponseType, Player, DialogUser }