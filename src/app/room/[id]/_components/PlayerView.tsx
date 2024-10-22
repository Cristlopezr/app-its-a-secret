import { useGameStore } from '@/app/store/store';

export const PlayerView = () => {
    const room = useGameStore(state => state.room);
    return <div>PlayerView</div>;
};
