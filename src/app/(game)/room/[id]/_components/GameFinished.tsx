import { useRouter } from 'next/navigation';
import { PlayersList } from './PlayersList';
import { Button } from '@/app/_components/ui';
import { useAudioStore } from '@/app/store/store';
import { useEffect } from 'react';
import { audioUrls } from '@/lib/constants';

export const GameFinished = () => {
    const router = useRouter();
    const setCurrentMusicSrc = useAudioStore(state => state.setCurrentMusicSrc);

    useEffect(() => {
        setCurrentMusicSrc(audioUrls.startEnd);
    }, []);

    return (
        <div className='flex flex-col items-center pt-40 gap-10'>
            <div className='text-2xl'>Final reveal! Players are ranked based on their hidden scores. Who guessed best?</div>
            <PlayersList sortedByScores />
            <Button onClick={() => router.replace('/')}>Go to home</Button>
        </div>
    );
};
