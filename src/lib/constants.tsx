import { Bird, Bug, Cat, Dog, Fish, Rabbit, Rat, Snail, Turtle, Worm } from 'lucide-react';
export type IconName = keyof typeof icons;
export type ColorName = keyof typeof colorVariants;

export const icons = {
    cat: <Cat />,
    dog: <Dog />,
    rabbit: <Rabbit />,
    snail: <Snail />,
    turtle: <Turtle />,
    bird: <Bird />,
    bug: <Bug />,
    fish: <Fish />,
    rat: <Rat />,
    worm: <Worm />,
};

export const colorVariants = {
    blue: 'bg-red-500 hover:bg-red-400',
    orange: 'bg-orange-500 hover:bg-orange-400',
    amber: 'bg-amber-500 hover:bg-amber-400',
    yellow: 'bg-yellow-500 hover:bg-yellow-400',
    emerald: 'bg-emerald-500 hover:bg-emerald-400',
    teal: 'bg-teal-500 hover:bg-teal-400',
    indigo: 'bg-indigo-500 hover:bg-indigo-400',
    violet: 'bg-violet-500 hover:bg-violet-400',
    pink: 'bg-pink-500 hover:bg-pink-400',
    purple: 'bg-purple-500 hover:bg-purple-400',
};
