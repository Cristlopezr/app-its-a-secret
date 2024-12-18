import { Apple, Atom, Banana, Bird, Bug, Cat, Cherry, Citrus, Coffee, Cookie, Dog, Fish, Grape, Palette, Rabbit, Rat, Rocket, Snail, Turtle, Worm } from 'lucide-react';

export type IconName = keyof typeof icons;

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
