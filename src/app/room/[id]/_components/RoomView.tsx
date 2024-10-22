import { useGameStore } from '@/app/store/store';
import { AdminView } from './AdminView';
import { PlayerView } from './PlayerView';

export const RoomView = () => {
    const singlePlayer = useGameStore(state => state.singlePlayer);

    if (singlePlayer && singlePlayer.role === 'Admin') {
        return <AdminView />;
    }

    return <PlayerView />;
};
