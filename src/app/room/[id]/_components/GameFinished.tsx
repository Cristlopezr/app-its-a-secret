import { useRouter } from 'next/navigation';
import { PlayersList } from './PlayersList';
import { Button } from '@/components/ui';

export const GameFinished = () => {
    const router = useRouter();
    return (
        <div className='flex flex-col items-center pt-40 gap-10'>
            <div className='text-2xl'>Final reveal! Players are ranked based on their hidden scores. Who guessed best?</div>
            <PlayersList sortedByScores />
            <Button onClick={() => router.replace('/')}>Go to home</Button>
        </div>
    );
};
