import React from 'react';
import { PricingTable } from '@clerk/clerk-react';

const Plan = () => {
  return (
    // Outer container for padding and overall centering
    <div className='px-4 sm:px-20 xl:px-32 my-24'> {/* Added consistent padding and margin */}
        <div className='text-center mb-14'> {/* Added margin-bottom to separate heading from table */}
            <h2 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h2>
            <p className='text-gray-500 max-w-lg mx-auto'>
                Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
            </p>
        </div>
        
        {/* Container specifically for the PricingTable to ensure it's centered */}
        {/* Removed max-w-2xl from here, as the Clerk component might have its own max-width */}
        {/* Added flex justify-center to center the PricingTable if it's a block element */}
        <div className='flex justify-center'>
            <PricingTable />
        </div>
    </div>
  );
}

export default Plan;
