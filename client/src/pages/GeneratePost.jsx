import { MessageSquare, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import Markdown from 'react-markdown';

// Set the base URL for axios requests
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';

const GeneratePost = () => {
  // Options for the social media platform
  const postPlatforms = [
    { platform: 'Twitter', text: 'Twitter' },
    { platform: 'LinkedIn', text: 'LinkedIn' },
    { platform: 'Facebook', text: 'Facebook' },
  ];

  // State management
  const [selectedPlatform, setSelectedPlatform] = useState(postPlatforms[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState('');

  // Auth hook from Clerk
  const { getToken } = useAuth();

  /**
   * Handles the form submission to generate the social media post.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error('Please enter a topic for the post.');
      return;
    }

    try {
      setLoading(true);
      setPost(''); // Clear previous post

      // Construct the prompt for the AI model
      const prompt = `Generate a social media post for ${selectedPlatform.text} about the following topic: "${input}". The post should be engaging and appropriate for the platform.`;

      const { data } = await axios.post(
        '/api/ai/generate-post', // The new backend endpoint
        { prompt },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setPost(data.post); // Expecting { success: true, post: '...' }
      } else {
        toast.error(data.message || 'Failed to generate post.');
      }
    } catch (error) {
      console.error('Post generation error:', error);
      toast.error(error.response?.data?.message || error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700 font-sans'>
      {/* Left Column: Input and Configuration */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 h-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generate Social Post</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Post Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300'
          placeholder='e.g., The benefits of remote work...'
          required
        />

        <p className='mt-4 text-sm font-medium'>Platform</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {postPlatforms.map((item, index) => (
            <span
              onClick={() => setSelectedPlatform(item)}
              className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-colors duration-200 ${
                selectedPlatform.platform === item.platform
                  ? 'bg-blue-100 text-blue-700 border-blue-300 font-semibold'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          disabled={loading || !input}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2.5 mt-6 text-sm font-medium rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition-opacity'
        >
          {loading ? (
            <span className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
          ) : (
            <MessageSquare className='w-5 h-5' />
          )}
          Generate Post
        </button>
      </form>

      {/* Right Column: Generated Post Output */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px] shadow-sm'>
        <div className='flex items-center gap-3'>
          <MessageSquare className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Post</h1>
        </div>

        {!post && !loading ? (
          <div className='flex-1 flex justify-center items-center text-center'>
            <div className='text-sm flex flex-col items-center gap-4 text-gray-400'>
              <MessageSquare className='w-10 h-10' />
              <p>Your generated post will appear here.</p>
            </div>
          </div>
        ) : loading ? (
            <div className='flex-1 flex justify-center items-center text-center'>
                <div className='text-sm flex flex-col items-center gap-4 text-gray-500'>
                    <span className='w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin'></span>
                    <p>Generating... please wait.</p>
                </div>
            </div>
        ) : (
          <div className='mt-4 h-full overflow-y-auto text-sm text-slate-700 prose prose-sm max-w-none'>
            <Markdown>{post}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePost;
