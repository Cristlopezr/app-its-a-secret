type Role = 'Admin' | 'Player';

export interface Player {
    id: string;
    username: string;
    role: Role;
}

export type RoomStatus = 'waiting' | 'started';

interface Secret {
    id: string;
    playerId: string;
    secret: string;
}

export interface Room {
    id: string;
    code: string;
    roomStatus: RoomStatus;
    players: Player[];
    secrets: Secret[];
}
