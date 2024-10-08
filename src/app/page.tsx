'use client';

import { Button } from '@/components/ui';
import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
export default function Home() {
    const router = useRouter();

    const onCreateRoom = () => {
        socket.emit('create-room');
    };

    return (
        <div className=''>
            <Button onClick={onCreateRoom}>Create Room</Button>
        </div>
    );
}
