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
    hasVerifedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
    userImg: string
}

export type User = Player
export type { ResponseType, Player }