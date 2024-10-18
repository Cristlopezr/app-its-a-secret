import { create } from 'zustand';
import { Player, RoomStatus } from '../interfaces/interfaces';

interface GameState {
    players: Player[];
    singlePlayer: Player | undefined;
    roomStatus: RoomStatus;
    setPlayers: (players: Player[]) => void;
    setSinglePlayer: (player: Player) => void;
    setRoomStatus: (roomStatus: RoomStatus) => void;
}

export const useGameStore = create<GameState>()(set => ({
    players: [],
    singlePlayer: undefined,
    roomStatus: 'waiting',
    setPlayers: players => set(state => ({ players: players })),
    setSinglePlayer: player => set(() => ({ singlePlayer: player })),
    setRoomStatus: roomStatus => set(() => ({ roomStatus: roomStatus })),
}));
