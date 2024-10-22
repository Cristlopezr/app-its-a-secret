import { create } from 'zustand';
import { Player, Room, RoomStatus } from '../interfaces/interfaces';

interface GameState {
    singlePlayer: Player | undefined;
    room: Room;
    setSinglePlayer: (player: Player) => void;
    setRoom: (room: Room) => void;
}

export const useGameStore = create<GameState>()(set => ({
    singlePlayer: undefined,
    room: { code: '', id: '', roomStatus: 'waitingPlayers', secrets: [], players: [], config: [] },
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
