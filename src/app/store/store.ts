import { create } from 'zustand';
import { Player, Room } from '../interfaces/interfaces';
import { RefObject } from 'react';
import { audioUrls } from '@/lib/constants';

interface GameState {
    singlePlayer: Player | undefined;
    room: Room;
    setSinglePlayer: (player: Player) => void;
    setRoom: (room: Room) => void;
    setRoomStatus: (status: Room['status']) => void;
    setRoomCurrentSecretIdx: (currentSecretIdx: number) => void;
}

interface AudioState {
    currentMusicSrc: string;
    audioRef: RefObject<HTMLAudioElement> | null;
    setAudioRef: (audioRef: RefObject<HTMLAudioElement>) => void;
    setCurrentMusicSrc: (src: string) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    play: () => void;
}

export const useAudioStore = create<AudioState>()(set => ({
    currentMusicSrc: audioUrls.startEnd,
    audioRef: null,
    setAudioRef: audioRef => set(() => ({ audioRef })),
    setCurrentMusicSrc: src =>
        set(state => {
            if (state.audioRef?.current) {
                state.audioRef.current.pause();
                /*  state.audioRef.current.src = src; */
            }
            return { currentMusicSrc: src };
        }),
    isPlaying: false,
    setIsPlaying: isPlaying =>
        set(state => {
            if (state.audioRef?.current) {
                if (state.isPlaying) {
                    state.audioRef.current.pause();
                } else {
                    state.audioRef.current.play();
                }
            }
            return {
                isPlaying: isPlaying,
            };
        }),
    play: () =>
        set(state => {
            if (state.audioRef?.current) {
                state.audioRef?.current?.load();
                state.audioRef?.current?.play();
            }
            return {
                isPlaying: true,
            };
        }),
}));

export const useGameStore = create<GameState>()(set => ({
    singlePlayer: undefined,
    room: { code: '', id: '', status: 'waitingPlayers', secrets: [], players: [], config: [], maxPlayers: 0, currentSecretIdx: 0 },
    setSinglePlayer: player => set(() => ({ singlePlayer: player })),
    setRoom: room => set(() => ({ room })),
    setRoomStatus: status =>
        set(state => ({
            room: {
                ...state.room,
                status,
            },
        })),
    setRoomCurrentSecretIdx: currentSecretIdx =>
        set(state => ({
            room: {
                ...state.room,
                currentSecretIdx,
            },
        })),
}));

export enum Scope {
    CreateRoom = 'createRoom',
    JoinRoom = 'joinRoom',
    EnterName = 'enterName',
}

interface UiState {
    notifications: Partial<Record<Scope, string>>;
    setNotification: (scope: Scope, message: string) => void;
    clearNotifications: () => void;
}

export const useUiStore = create<UiState>()(set => ({
    notifications: {},
    setNotification: (scope, message) =>
        set(state => ({
            notifications: {
                ...state.notifications,
                [scope]: message,
            },
        })),
    clearNotifications: () => set(() => ({ notifications: {} })),
}));
