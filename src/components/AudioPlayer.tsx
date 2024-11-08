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
    const setAudioRef = useAudioStore(state => state.setAudioRef);
    const play = useAudioStore(state => state.play);
    const isPlaying = useAudioStore(state => state.isPlaying);
    const setIsPlaying = useAudioStore(state => state.setIsPlaying);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        setAudioRef(audioRef);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            play();
        }
    }, [currentMusic]);

    const onSetIsPlaying = () => {
        setIsPlaying(!isPlaying);
    };
    return (
        <div>
            {!isPlaying && <VolumeOff className={cn(className)} onClick={onSetIsPlaying} />}
            {isPlaying && <Volume2 className={cn(className)} onClick={onSetIsPlaying} />}
            <audio className='invisible' ref={audioRef} src={currentMusic} loop autoPlay={false} />
        </div>
    );
};
