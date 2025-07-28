import { BookText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react'; 
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const SummarizeContent = () => {
  // Options for the desired summary format
  const summaryStyles = [
    { style: 'paragraph', text: 'Paragraph' },
    { style: 'bullets', text: 'Bullet Points' },
  ];

  // State management
  const [selectedStyle, setSelectedStyle] = useState(summaryStyles[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  // Assuming useAuth hook provides a getToken method for authorization
  const { getToken } = useAuth();

  /**
   * Handles the form submission to generate the summary.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error('Please paste some content to summarize.');
      return;
    }

    try {
      setLoading(true);
      setSummary(''); // Clear previous summary

      // Construct the prompt for the AI model
      const prompt = `Summarize the following content as ${selectedStyle.text}:\n\n---\n\n${input}`;

      // Mock API call - replace with your actual API endpoint
      const { data } = await axios.post(
        '/api/ai/generate-summary', // You'll need to create this endpoint
        { prompt },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setSummary(data.summary); 
      } else {
        toast.error(data.message || 'Failed to generate summary.');
      }
    } catch (error) {
      console.error('Summarization error:', error);
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
          <h1 className='text-xl font-semibold'>Summarize Content</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Paste your content below</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className='w-full p-3 mt-2 h-48 outline-none text-sm rounded-md border border-gray-300 resize-y focus:ring-2 focus:ring-blue-300'
          placeholder='Paste the article, notes, or any text you want to summarize here...'
          required
        />

        <p className='mt-4 text-sm font-medium'>Summary Style</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {summaryStyles.map((item, index) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-colors duration-200 ${
                selectedStyle.style === item.style
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
            <BookText className='w-5 h-5' />
          )}
          Generate Summary
        </button>
      </form>

      {/* Right Column: Generated Summary Output */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px] shadow-sm'>
        <div className='flex items-center gap-3'>
          <BookText className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Summary</h1>
        </div>

        {!summary && !loading ? (
          <div className='flex-1 flex justify-center items-center text-center'>
            <div className='text-sm flex flex-col items-center gap-4 text-gray-400'>
              <BookText className='w-10 h-10' />
              <p>Your generated summary will appear here.</p>
            </div>
          </div>
        ) : loading ? (
            <div className='flex-1 flex justify-center items-center text-center'>
                <div className='text-sm flex flex-col items-center gap-4 text-gray-500'>
                    <span className='w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin'></span>
                    <p>Summarizing... please wait.</p>
                </div>
            </div>
        ) : (
          <div className='mt-4 h-full overflow-y-auto text-sm text-slate-700 prose prose-sm max-w-none'>
            <Markdown>{summary}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarizeContent;