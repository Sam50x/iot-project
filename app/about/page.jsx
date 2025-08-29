import kitImage from '@/public/kit.jpg'
import Image from 'next/image'

const ReportPage = () => {
    return (
        <div className="font-sans flex flex-col items-center justify-start w-full h-full">
            <Image
                src={kitImage}
                className='w-120 rounded object-cover aspect-video opacity-70 mb-4'
            />
            <h1 className='text-center font-bold text-2xl'>itzz Radarrr 😭💔🥀</h1>
            <p className='mt-4 w-120'>For our IoT project we have built a radar guard it detects the objects and their distance, sends the distance to hivemq, then a bridge app built with javascript sends from hivemq to supabase, then from our main app we receive the data from supabase</p>
        </div>
    )
}

export default ReportPage