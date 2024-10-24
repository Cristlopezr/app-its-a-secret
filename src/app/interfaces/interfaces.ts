type Role = 'Admin' | 'Player';

export interface Player {
    id: string;
    username: string;
    role: Role;
    score: number;
}

export type RoomStatus = 'waitingPlayers' | 'waitingSecrets' | 'started' | 'finished';

interface Secret {
    id: string;
    playerId: string;
    secret: string;
}

interface Config {
    id: string;
    description: string;
    isActive: boolean;
}

export interface Room {
    id: string;
    code: string;
    players: Player[];
    status: RoomStatus;
    secrets: Secret[];
    config: Config[];
    maxPlayers: number;
    currentSecretIdx: number;
}
