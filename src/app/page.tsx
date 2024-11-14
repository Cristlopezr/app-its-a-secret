import { Card, CardContent } from '@/components/ui/card';
import { CreateRoom } from './room/_components/CreateRoom';
import { JoinRoom } from './room/_components/JoinRoom';

export default function Home() {
    return (
        <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-16'>
                <h1 className='text-6xl font-bold text-center mb-6'>It&apos;s a Secret! 🤫</h1>

                <h2 className='text-center text-3xl'>The ultimate party game where secrets come out to play!</h2>
                <p className='text-2xl text-center my-10'>Share your secrets anonymously and see if your friends can figure out who wrote what!</p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <section>
                        <Card className='p-5 bg-background hover:shadow-lg transition-shadow'>
                            <CardContent>
                                <h2 className='text-2xl font-semibold mb-4'>🎮 Game Overview</h2>
                                <ul className='space-y-3'>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>👥</span>
                                        <span>Gather at least 4 players!</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>✍️</span>
                                        <span>Write your juiciest secret (anonymously, of course!)</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>🔍</span>
                                        <span>Put on your detective hat and guess who wrote what</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>⚡</span>
                                        <span>Quick guesses earn more points - speed is key!</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>🤐</span>
                                        <span>Don&apos;t worry - your secret stays safe even after guesses</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className='p-5 mt-6 bg-background hover:shadow-lg transition-shadow'>
                            <CardContent>
                                <h2 className='text-2xl font-semibold mb-4'>📜 Quick Rules</h2>
                                <ul className='space-y-3'>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>1️⃣</span>
                                        <span>One secret per player - make it interesting!</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>2️⃣</span>
                                        <span>Everyone gets to guess for each secret</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>3️⃣</span>
                                        <span>Votes on your own secret won&apos;t count (we&apos;ll know!)</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='text-xl'>4️⃣</span>
                                        <span>Winner gets crowned, secrets stay anonymous!</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    <section className='text-center p-10 max-w-xl self-center mx-auto w-full'>
                        <div className='space-y-8'>
                            <div className='transform hover:scale-105 transition-transform'>
                                <CreateRoom />
                            </div>

                            <div className='relative'>
                                <div className='absolute inset-0 flex items-center'>
                                    <span className='w-full border-t' />
                                </div>
                                <div className='relative flex justify-center text-sm uppercase'>
                                    <span className='bg-background px-4 text-muted-foreground'>Or join one</span>
                                </div>
                            </div>

                            <div className='transform hover:scale-105 transition-transform'>
                                <JoinRoom />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
