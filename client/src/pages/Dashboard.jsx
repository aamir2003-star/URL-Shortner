import React, { useEffect, useState } from 'react';
import { ExternalLink, Trash2, MousePointer2, Clock, Link2, Zap, ArrowRight } from 'lucide-react';
import useURLStore from '../store/urlStore';

const Dashboard = () => {
  const { urls, loading, fetchURLs, deleteURL, shortenURL } = useURLStore();
  const [copiedId, setCopiedId] = useState(null);
  const [newUrl, setNewUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [isShortening, setIsShortening] = useState(false);

  useEffect(() => {
    fetchURLs();
  }, [fetchURLs]);

  const handleCopy = (id, shortUrl) => {
    const fullUrl = `${window.location.origin}/r/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShortenSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsShortening(true);
    try {
      await shortenURL(newUrl);
      setNewUrl('');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setIsShortening(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your shortened links and track performance</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-lg">
          <span className="text-blue-400 font-bold">{urls.length}</span>
          <span className="text-gray-400 text-sm ml-2 font-medium uppercase tracking-wider">Total Links</span>
        </div>
      </div>

      <div className="grid gap-4">
        {urls.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-800/30 border border-gray-700 border-dashed rounded-2xl p-8 md:p-12 text-center space-y-6">
            <div className="space-y-2">
              <Link2 className="w-12 h-12 mx-auto text-blue-500/70" />
              <h3 className="text-xl font-bold text-white">No links shortened yet</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Start by creating your first shortened link right here and track its analytics in real-time.
              </p>
            </div>

            <form onSubmit={handleShortenSubmit} className="w-full max-w-2xl relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative flex flex-col sm:flex-row gap-3 p-1.5 bg-gray-800 rounded-xl border border-gray-700">
                <input
                  type="url"
                  placeholder="Paste your long URL here..."
                  required
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none text-base"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isShortening}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-6 py-3 rounded-lg font-bold text-base flex items-center justify-center space-x-2 transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>{isShortening ? 'Shortening...' : 'Shorten'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
            {formError && <p className="text-red-400 text-sm">{formError}</p>}
          </div>
        ) : (
          urls.map((url) => (
            <div
              key={url._id}
              className="group bg-gray-800/50 border border-gray-700 hover:border-blue-500/30 rounded-2xl p-6 transition-all hover:bg-gray-800"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-white break-all">
                      {window.location.origin}/r/{url.shortUrl}
                    </h3>
                    <button
                        onClick={() => handleCopy(url._id, url.shortUrl)}
                        className={`p-1.5 rounded-md transition-all ${
                          copiedId === url._id ? 'text-green-400 bg-green-400/10' : 'text-gray-500 hover:text-blue-400 hover:bg-blue-400/10'
                        }`}
                        title="Copy link"
                      >
                        {copiedId === url._id ? <Zap className="w-4 h-4 fill-current" /> : <Link2 className="w-4 h-4" />}
                      </button>
                  </div>
                  <p className="text-gray-500 truncate text-sm flex items-center space-x-2">
                    <span className="shrink-0 text-gray-600">Original:</span>
                    <a href={url.longUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors truncate">
                      {url.longUrl}
                    </a>
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-2 text-blue-400 px-3 py-1 bg-blue-400/10 rounded-full">
                      <MousePointer2 className="w-4 h-4" />
                      <span className="font-bold">{url.clicks || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-2 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(url.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="h-8 w-[1px] bg-gray-700 hidden md:block mx-2"></div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`${window.location.origin}/r/${url.shortUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                      title="Open Link"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => deleteURL(url._id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      title="Delete Link"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
