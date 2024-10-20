import { create } from 'zustand';
import { Player, Room, RoomStatus } from '../interfaces/interfaces';

interface GameState {
    players: Player[];
    singlePlayer: Player | undefined;
    room: Room;
    setPlayers: (players: Player[]) => void;
    setSinglePlayer: (player: Player) => void;
    setRoom: (room: Room) => void;
}

export const useGameStore = create<GameState>()(set => ({
    players: [],
    singlePlayer: undefined,
    room: { code: '', id: '', roomStatus: 'waiting', secrets: [] },
    setPlayers: players => set(state => ({ players })),
    setSinglePlayer: player => set(() => ({ singlePlayer: player })),
    setRoom: room => set(() => ({ room })),
}));

interface UiState {
    notification: string;
    setNotification: (notifaction: string) => void;
}

export const useUiStore = create<UiState>()(set => ({
    notification: '',
    setNotification: notification => set(() => ({ notification })),
}));
