import { useGameStore } from '@/app/store/store';
import { Button } from '@/components/ui';

export const AdminView = () => {
    const room = useGameStore(state => state.room);
    const players = useGameStore(state => state.players);
    console.log(players);
    return (
        <div>
            Invite at least 3 friends to play. this is the code to join the room: {room.code} share it with them When ready to write your secrets, click the button below
            <div>
                Players that are in the game:{' '}
                {players.map(player => (
                    <div key={player.id}>{player.username}</div>
                ))}
            </div>
            <Button>Write your secrets</Button>
            <div>Waiting for players to confess their secrets</div>
            <Button>Play</Button>
        </div>
    );
};
