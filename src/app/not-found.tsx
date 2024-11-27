import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex items-center justify-center pt-40'>
            <div>
                <div className='mb-10'>
                    <h2 className='text-6xl font-bold mb-2'>Oops!</h2>
                    <p className='text-xl'>It looks like the page you are looking for doesn&apos;t exist.</p>
                </div>
                <Link href='/'>Go back to home</Link>
            </div>
        </div>
    );
}
