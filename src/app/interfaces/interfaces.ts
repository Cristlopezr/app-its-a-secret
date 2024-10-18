type Role = 'Admin' | 'Player';

export interface Player {
    id: string;
    username: string;
    role: Role;
}

export type RoomStatus = 'waiting' | 'started';
