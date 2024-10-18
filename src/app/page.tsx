import { CreateRoomForm } from './room/_components/CreateRoomForm';
import { JoinRoomForm } from './room/_components/JoinRoomForm';

export default function Home() {
    return (
        <div className=''>
            <CreateRoomForm />
            <JoinRoomForm />
        </div>
    );
}
