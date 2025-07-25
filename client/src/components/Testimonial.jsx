import React from 'react';

// Define the Card component (this part is correct as a standalone card)
const Card = ({ image, name, handle, text }) => {
    return (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
            <div className="flex gap-2">
                <img className="size-11 rounded-full" src={image} alt={`${name}'s profile`} />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="text-gray-900 font-medium">{name}</p>
                        {/* SVG for verified badge */}
                        <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.313.368.47.551.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
                        </svg>
                    </div>
                    <span className="text-xs text-slate-500">{handle}</span>
                </div>
            </div>
            <p className="text-sm pt-4 text-gray-800">{text}</p>
        </div>
    );
};

const Testimonial = () => {
    // Data for the cards
    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
            text: 'Radiant made undercutting all of our competitors an absolute breeze.',
            date: 'April 20, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            text: 'This tool has revolutionized our content strategy. Highly recommend!',
            date: 'May 10, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            text: 'Unbelievable efficiency gains. Our team can now focus on creativity.',
            date: 'June 5, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Michael Chen',
            handle: '@michael_c',
            text: 'The AI image generation is a game-changer for our marketing visuals.',
            date: 'July 1, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60',
            name: 'Sarah Kim',
            handle: '@sarah_k',
            text: 'Object removal is magic! Saves so much time in post-production.',
            date: 'July 15, 2025'
        },
    ];

    // To create a continuous loop, we duplicate the cards data
    const doubledCardsData = [...cardsData, ...cardsData];

    return (
        <div className='px-4 sm:px-20 xl:px-32 my-24'>
            {/* Heading and description - This is the correct place for them */}
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>

            {/* Styles for the marquee animation */}
            <style>{`
                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }
            
                    100% {
                        transform: translateX(-50%);
                    }
                }
            
                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }
            
                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>
            
            {/* Marquee Row 1 */}
            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                {/* Gradient overlay for left fade */}
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                
                {/* Marquee content for row 1 */}
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {doubledCardsData.map((card, index) => (
                        <Card key={`row1-${index}`} {...card} />
                    ))}
                </div>
                
                {/* Gradient overlay for right fade */}
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
            
            {/* Marquee Row 2 */}
            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                {/* Gradient overlay for left fade */}
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                
                {/* Marquee content for row 2 (reversed animation) */}
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-5 pb-10">
                    {doubledCardsData.map((card, index) => (
                        <Card key={`row2-${index}`} {...card} />
                    ))}
                </div>
                
                {/* Gradient overlay for right fade */}
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </div>
    );
};

export default Testimonial;
