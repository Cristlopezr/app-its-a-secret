'use client';

import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';
import { Room } from '../_components/Room';
import { EnterName } from '../_components/EnterName';
import { useGameStore } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import Loader from '@/app/_components/ui/loader';

export const RoomView = () => {
    const [showRoomView, setShowRoomView] = useState(false);
    const [isCheking, setIsCheking] = useState(true);
    const setRoom = useGameStore(state => state.setRoom);
    const room = useGameStore(state => state.room);
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const router = useRouter();

    //TODO:Checkear por los parametros si la room existe

    useEffect(() => {
        socket.on('joined-room', () => {
            setShowRoomView(true);
        });

        socket.on('update-users-in-room', payload => {
            setRoom(payload.room);
        });
        return () => {
            socket.off('joined-room');
            socket.off('update-users-in-room');
        };
    }, []);

    useEffect(() => {
        // Redirect if there's no player
        if (!singlePlayer || (room.status !== 'waitingPlayers' && room.status !== 'waitingSecrets')) {
            router.push('/');
        } else {
            setIsCheking(false);
        }
    }, [singlePlayer, router]);

    if (isCheking) {
        return <Loader />;
    }

    if (!showRoomView && !singlePlayer?.username) {
        return <EnterName />;
    }

    return <Room />;
};
