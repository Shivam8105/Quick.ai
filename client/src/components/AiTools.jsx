import React, { useState, useEffect, useRef } from 'react';
import { AiToolsData } from '../assets/assets'; // Assuming AiToolsData is correctly imported
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

// This component is for displaying AI tools available in the application
const AiTools = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    // State to track visibility of each card
    // We'll use a Map or an object to store visibility for each tool by its index
    const [visibleTools, setVisibleTools] = useState({});

    // Ref to hold references to each tool card for IntersectionObserver
    const toolRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // When a tool card enters the viewport, set its visibility to true
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleTools(prev => ({ ...prev, [index]: true }));
                        // Optionally, unobserve the element after it becomes visible
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null, // viewport as the root
                rootMargin: '0px',
                threshold: 0.1, // Trigger when 10% of the item is visible
            }
        );

        // Observe each tool card
        toolRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        // Cleanup function
        return () => {
            toolRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []); // Run once on component mount

    return (
        <div className='px-4 sm:px-20 xl:px-32 my-24'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.</p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {AiToolsData.map((tool, index) => (
                    <div
                        key={index}
                        ref={el => toolRefs.current[index] = el} // Assign ref to the element
                        data-index={index} // Store index for easy lookup in observer
                        className={`
                            p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100
                            hover:scale-105 transition-all duration-500 cursor-pointer
                            ${visibleTools[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                        `}
                        onClick={() => { user && navigate(tool.path) }}
                    >
                        <tool.Icon
                            className='w-12 h-12 p-3 text-white rounded-xl'
                            style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
                        />
                        <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
                        <h3 className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AiTools;
