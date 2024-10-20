import { useGameStore } from '@/app/store/store';

export const PlayerView = () => {
    const room = useGameStore(state => state.room);
    const players = useGameStore(state => state.players);
    return <div>PlayerView</div>;
};
