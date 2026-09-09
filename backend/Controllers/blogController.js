import Blog from "../Models/Blog.js";

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res) => {
  try {
    const { title, slug, metaTitle, metaDescription, excerpt, content } =
      req.body;

    let image = req.body.image || "";
    if (req.file) {
      image = req.file.path;
    }

    const blog = await Blog.create({
      title,
      slug, // optional — auto-generated from title when blank
      metaTitle,
      metaDescription,
      excerpt,
      content,
      image,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (err) {
    // Friendly message for a duplicate custom URL
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "That blog URL is already in use. Please choose a different one.",
      });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:slug
// @access  Private
export const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    const { title, slug, metaTitle, metaDescription, excerpt, content } =
      req.body;
    let image = req.body.image || blog.image;

    if (req.file) {
      image = req.file.path;
    }

    const fields = { title, metaTitle, metaDescription, excerpt, content, image };

    // Only touch the slug when the admin actually sends a new, different value
    if (typeof slug === "string" && slug.trim() && slug.trim() !== blog.slug) {
      fields.slug = slug.trim();
    }

    blog = await Blog.findOneAndUpdate({ slug: req.params.slug }, fields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "That blog URL is already in use. Please choose a different one.",
      });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:slug
// @access  Private
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};