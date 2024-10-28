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
    blue: 'bg-blue-500 hover:bg-blue-400 text-white',
    orange: 'bg-orange-500 hover:bg-orange-400 text-white',
    amber: 'bg-amber-500 hover:bg-amber-400 text-black',
    yellow: 'bg-yellow-500 hover:bg-yellow-400 text-black',
    emerald: 'bg-emerald-500 hover:bg-emerald-400 text-white',
    teal: 'bg-teal-500 hover:bg-teal-400 text-white',
    indigo: 'bg-indigo-500 hover:bg-indigo-400 text-white',
    violet: 'bg-violet-500 hover:bg-violet-400 text-white',
    pink: 'bg-pink-500 hover:bg-pink-400 text-white',
    purple: 'bg-purple-500 hover:bg-purple-400 text-white',
    red: 'bg-red-500 hover:bg-red-400 text-white',
    green: 'bg-green-500 hover:bg-green-400 text-white',
    lime: 'bg-lime-500 hover:bg-lime-400 text-black',
    cyan: 'bg-cyan-500 hover:bg-cyan-400 text-black',
    sky: 'bg-sky-500 hover:bg-sky-400 text-white',
    rose: 'bg-rose-500 hover:bg-rose-400 text-white',
    fuchsia: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white',
    peach: 'bg-orange-300 hover:bg-orange-200 text-black',
    lavender: 'bg-purple-300 hover:bg-purple-200 text-black',
};
