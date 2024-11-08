import { Card, CardContent } from '@/components/ui/card';
import { CreateRoom } from './room/_components/CreateRoom';
import { JoinRoom } from './room/_components/JoinRoom';

export default function Home() {
    return (
        <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-16 '>
                <h1 className='text-6xl font-bold text-center mb-6'>Welcome to It's a Secret! 🤫</h1>

                <h2 className='text-center text-3xl'>Gather your friends and get ready for a fun game of secrets and guesses!</h2>
                <p className='text-2xl text-center my-10'>Ready to play? Create a room or join with a code, and let the fun begin!</p>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-between'>
                    <section className=''>
                        <Card className='p-5 bg-background'>
                            <CardContent>
                                <h2 className='text-2xl font-semibold mb-2'>How to Play:</h2>
                                <ul className='list-disc list-inside mb-4 flex flex-col gap-2'>
                                    <li>Each player anonymously writes a secret.</li>
                                    <li>The challenge is to guess which friend wrote each secret.</li>
                                    <li>The faster you guess correctly, the more points you earn!</li>
                                    <li>Scores stay hidden, so no one knows who wrote the secret, even if a player guessed all of them correctly.</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className='p-5 mt-10 bg-background'>
                            <CardContent>
                                <h2 className='text-2xl font-semibold mb-2'>Rules:</h2>
                                <ul className='list-disc list-inside mb-4 flex flex-col gap-2'>
                                    <li>Each player writes a secret.</li>
                                    <li>Everyone tries to guess which friend the secret belongs to.</li>
                                    <li>If the secret on screen is yours, your vote won't count, whether you vote for yourself or someone else.</li>
                                    <li>At the end of the game, the winner will be revealed, but the secrets stay safe!</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </section>
                    <section className='text-center p-10 max-w-xl self-center mx-auto w-full row-start-1 md:col-start-2'>
                        <div className='mb-5'>
                            <CreateRoom />
                        </div>
                        <div className='relative my-5'>
                            <div className='absolute inset-0 flex items-center'>
                                <span className='w-full border-t' />
                            </div>
                            <div className='relative flex justify-center text-sm uppercase'>
                                <span className='bg-background px-2'>Or</span>
                            </div>
                        </div>
                        <div className='text-center'>
                            <JoinRoom />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
