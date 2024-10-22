import { CreateRoom } from './room/_components/CreateRoom';
import { JoinRoomForm } from './room/_components/JoinRoomForm';

export default function Home() {
    return (
        <div className=''>
            <CreateRoom />
            <JoinRoomForm />
        </div>
    );
}
