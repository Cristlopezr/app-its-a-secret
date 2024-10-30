import { Apple, Atom, Banana, Bird, Bug, Cat, Cherry, Citrus, Coffee, Cookie, Dog, Fish, Grape, Palette, Rabbit, Rat, Rocket, Snail, Turtle, Worm } from 'lucide-react';
export type IconName = keyof typeof icons;
export type ColorName = keyof typeof colorVariants;

export const icons = {
    cat: ({ color, size = '28' }: { color: string; size?: string }) => <Cat color={color} size={size} />,
    dog: ({ color, size = '28' }: { color: string; size?: string }) => <Dog color={color} size={size} />,
    rabbit: ({ color, size = '28' }: { color: string; size?: string }) => <Rabbit color={color} size={size} />,
    snail: ({ color, size = '28' }: { color: string; size?: string }) => <Snail color={color} size={size} />,
    turtle: ({ color, size = '28' }: { color: string; size?: string }) => <Turtle color={color} size={size} />,
    bird: ({ color, size = '28' }: { color: string; size?: string }) => <Bird color={color} size={size} />,
    bug: ({ color, size = '28' }: { color: string; size?: string }) => <Bug color={color} size={size} />,
    fish: ({ color, size = '28' }: { color: string; size?: string }) => <Fish color={color} size={size} />,
    rat: ({ color, size = '28' }: { color: string; size?: string }) => <Rat color={color} size={size} />,
    worm: ({ color, size = '28' }: { color: string; size?: string }) => <Worm color={color} size={size} />,
    rocket: ({ color, size = '28' }: { color: string; size?: string }) => <Rocket color={color} size={size} />,
    atom: ({ color, size = '28' }: { color: string; size?: string }) => <Atom color={color} size={size} />,
    banana: ({ color, size = '28' }: { color: string; size?: string }) => <Banana color={color} size={size} />,
    citrus: ({ color, size = '28' }: { color: string; size?: string }) => <Citrus color={color} size={size} />,
    apple: ({ color, size = '28' }: { color: string; size?: string }) => <Apple color={color} size={size} />,
    cherry: ({ color, size = '28' }: { color: string; size?: string }) => <Cherry color={color} size={size} />,
    grape: ({ color, size = '28' }: { color: string; size?: string }) => <Grape color={color} size={size} />,
    coffe: ({ color, size = '28' }: { color: string; size?: string }) => <Coffee color={color} size={size} />,
    cookie: ({ color, size = '28' }: { color: string; size?: string }) => <Cookie color={color} size={size} />,
    palette: ({ color, size = '28' }: { color: string; size?: string }) => <Palette color={color} size={size} />,
};

export const colorVariants = {
    blue: { bg: 'bg-blue-500 hover:bg-blue-400 text-white', color: '#3b82f6' },
    orange: { bg: 'bg-orange-500 hover:bg-orange-400 text-white', color: '#f97316' },
    amber: { bg: 'bg-amber-500 hover:bg-amber-400 text-black', color: '#f59e0b' },
    yellow: { bg: 'bg-yellow-500 hover:bg-yellow-400 text-black', color: '#eab308' },
    emerald: { bg: 'bg-emerald-500 hover:bg-emerald-400 text-white', color: '#10b981' },
    teal: { bg: 'bg-teal-500 hover:bg-teal-400 text-white', color: '#14b8a6' },
    indigo: { bg: 'bg-indigo-500 hover:bg-indigo-400 text-white', color: '#6366f1' },
    violet: { bg: 'bg-violet-500 hover:bg-violet-400 text-white', color: '#8b5cf6' },
    pink: { bg: 'bg-pink-500 hover:bg-pink-400 text-white', color: '#ec4899' },
    purple: { bg: 'bg-purple-500 hover:bg-purple-400 text-white', color: '#a855f7' },
    red: { bg: 'bg-red-500 hover:bg-red-400 text-white', color: '#ef4444' },
    green: { bg: 'bg-green-500 hover:bg-green-400 text-white', color: '#22c55e' },
    lime: { bg: 'bg-lime-500 hover:bg-lime-400 text-black', color: '#84cc16' },
    cyan: { bg: 'bg-cyan-500 hover:bg-cyan-400 text-black', color: '#06b6d4' },
    sky: { bg: 'bg-sky-500 hover:bg-sky-400 text-white', color: '#0ea5e9' },
    rose: { bg: 'bg-rose-500 hover:bg-rose-400 text-white', color: '#f43f5e' },
    fuchsia: { bg: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white', color: '#d946ef' },
    peach: { bg: 'bg-orange-300 hover:bg-orange-200 text-black', color: '#fdba74' },
    lavender: { bg: 'bg-purple-300 hover:bg-purple-200 text-black', color: '#c4b5fd' },
};
