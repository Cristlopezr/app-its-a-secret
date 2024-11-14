import { create } from 'zustand';
import { Player, Room } from '../interfaces/interfaces';
import { RefObject } from 'react';

interface GameState {
    singlePlayer: Player | undefined;
    room: Room;
    setSinglePlayer: (player: Player) => void;
    setRoom: (room: Room) => void;
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
    currentMusicSrc: '/assets/start-end.mp3',
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
}));

interface UiState {
    notification: string;
    setNotification: (notifaction: string) => void;
}

export const useUiStore = create<UiState>()(set => ({
    notification: '',
    setNotification: notification => set(() => ({ notification })),
}));
