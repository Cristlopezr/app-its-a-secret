'use client';

import { useAudioStore } from '@/app/store/store';
import { cn } from '@/lib/utils';
import { Volume2, VolumeOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
    className?: string;
}

export const AudioPlayer = ({ className }: Props) => {
    const currentMusic = useAudioStore(state => state.currentMusicSrc);
    const isPlaying = useAudioStore(state => state.isPlaying);
    const setIsPlaying = useAudioStore(state => state.setIsPlaying);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        const handlePlayPause = async () => {
            if (!audioRef.current) return;
            try {
                if (isPlaying) {
                    await audioRef.current.play();
                } else {
                    await audioRef.current.pause();
                }
            } catch (error) {
                console.error('Error handling audio play/pause:', error);
            }
        };

        handlePlayPause();
        return () => {};
    }, [isPlaying]);

    return (
        <div>
            {!isPlaying && <VolumeOff className={cn(className)} onClick={() => setIsPlaying(!isPlaying)} />}
            {isPlaying && <Volume2 className={cn(className)} onClick={() => setIsPlaying(!isPlaying)} />}
            <audio className='invisible' ref={audioRef} src={currentMusic} loop autoPlay={false} />
        </div>
    );
};
