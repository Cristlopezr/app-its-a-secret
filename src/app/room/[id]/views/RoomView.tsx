import { useGameStore } from '@/app/store/store';
import { AdminView } from './AdminView';
import { PlayerView } from './PlayerView';

export const RoomView = () => {
    const singlePlayer = useGameStore(state => state.singlePlayer);
    const admin = useGameStore(state => state.room.players).filter(player => player.role === 'Admin')[0];

    if (singlePlayer && singlePlayer.id === admin.id) {
        return <AdminView />;
    }

    return <PlayerView />;
};
