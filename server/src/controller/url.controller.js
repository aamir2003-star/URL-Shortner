import URLModel from '../model/url.model.js';
import ids from 'short-id';

const generateShortURL = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required',
      });
    }

    const shortID = ids.generate();

    const newURL = await URLModel.create({
      shortUrl: shortID,
      longUrl: url,
      user_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Generated short URL',
      body: newURL,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const redirectURL = async (req, res) => {
  try {
    const { shortID } = req.params;

    const urlEntry = await URLModel.findOneAndUpdate(
      { shortUrl: shortID },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!urlEntry) {
      return res.status(404).json({
        success: false,
        message: 'URL not found',
      });
    }

    res.redirect(urlEntry.longUrl);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserURLs = async (req, res) => {
  try {
    const urls = await URLModel.find({ user_id: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      body: urls,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteURL = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await URLModel.findOneAndDelete({
      _id: id,
      user_id: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'URL not found or unauthorized',
      });
    }

    res.status(200).json({
      success: true,
      message: 'URL deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { generateShortURL, redirectURL, getUserURLs, deleteURL };
