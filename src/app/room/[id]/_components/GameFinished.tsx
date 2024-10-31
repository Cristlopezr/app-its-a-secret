import { PlayersList } from './PlayersList';

export const GameFinished = () => {
    return (
        <div className='flex flex-col items-center pt-40 gap-10'>
            <div className='text-2xl'>Final reveal! Players are ranked based on their hidden scores. Who guessed best?</div>
            <PlayersList sortedByScores />
        </div>
    );
};
