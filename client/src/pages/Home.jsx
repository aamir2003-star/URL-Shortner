import React, { useState } from 'react';
import { Link2, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';
import useURLStore from '../store/urlStore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const { shortenURL } = useURLStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCopy = () => {
    if (shortened) {
      const fullUrl = `${window.location.origin}/r/${shortened.shortUrl}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setError('');
    try {
      const result = await shortenURL(url);
      setShortened(result);
      setUrl('');
      setCopied(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL');
    }
  };

  return (
    <div className="flex flex-col items-center py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Shorten your <span className="text-blue-500">links</span>, expand your <span className="text-purple-500">reach</span>.
        </h1>
        <p className="text-xl text-gray-400">
          Create short, memorable links in seconds. Track clicks and manage your digital presence with ease.
        </p>
      </div>

      {/* Shortener Box */}
      <div className="w-full max-w-3xl px-4">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative flex flex-col md:flex-row gap-4 p-2 bg-gray-800 rounded-2xl border border-gray-700">
            <input
              type="url"
              placeholder="Paste your long URL here..."
              required
              className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-500 focus:outline-none text-lg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <span>Shorten</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {shortened && (
          <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-blue-400 text-sm font-medium mb-2 uppercase tracking-wider">Your short link is ready!</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl font-mono text-white break-all">
                {window.location.origin}/r/{shortened.shortUrl}
              </span>
              <button
                onClick={handleCopy}
                className={`${
                  copied ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-blue-500/20 text-blue-400 border-blue-500/20'
                } hover:opacity-80 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap border`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {[
          { icon: Zap, title: "Lightning Fast", desc: "Instantly shorten any URL with our optimized infrastructure." },
          { icon: Shield, title: "Secure & Private", desc: "Your data is protected. Only you can manage your shortened links." },
          { icon: BarChart3, title: "Detailed Analytics", desc: "Track every click and understand your audience engagement." },
        ].map((f, i) => (
          <div key={i} className="p-8 bg-gray-800/40 border border-gray-700/50 rounded-2xl hover:border-blue-500/30 transition-colors group">
            <f.icon className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
