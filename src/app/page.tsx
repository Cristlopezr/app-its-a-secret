import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateRoom } from './room/_components/CreateRoom';
import { JoinRoomForm } from './room/_components/JoinRoomForm';

export default function Home() {
    return (
        <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-10 '>
                <h1 className='text-6xl font-bold text-center mb-6'>Welcome to It's a Secret! 🤫</h1>

                <h2 className='text-center text-3xl'>Gather your friends and get ready for a fun game of secrets and guesses!</h2>
                <p className='text-2xl text-center my-10'>Ready to play? Create a room or join with a code, and let the fun begin!</p>
                <section className='grid text-center grid-cols-1 md:grid-cols-[1fr,100px,1fr] px-20'>
                    <div className='flex flex-col justify-between'>
                        <p className='text-lg'>Create a Room</p>
                        <CreateRoom />
                    </div>
                    <div className='flex items-center justify-center w-full md:w-auto'>
                        <div className='mx-4font-medium'>OR</div>
                    </div>
                    <div>
                        <p className='text-lg'>Join a Room</p>
                        <JoinRoomForm />
                    </div>
                </section>
                <section className='flex gap-10 items-stretch mt-10'>
                    <Card className='p-5'>
                        <CardContent>
                            <h2 className='text-2xl font-semibold mb-2'>How to Play:</h2>
                            <ul className='list-disc list-inside mb-4 flex flex-col gap-2'>
                                <li>Each player anonymously writes a secret.</li>
                                <li>The challenge is to guess which friend wrote each secret.</li>
                                <li>Scores stay hidden, so no one knows who wrote the secret, even if a player guessed all of them correctly.</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className='p-5'>
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
            </div>
        </div>
    );
}
