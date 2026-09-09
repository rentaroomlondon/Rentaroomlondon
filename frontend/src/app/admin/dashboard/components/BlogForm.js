"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Upload } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR window is not defined issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import uploadToCloudinary from "@/app/utils/uploadToCloudinary";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Full "MS Word style" editor toolbar
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: { matchVisual: false },
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "indent",
  "align",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

// Turn any text into a clean URL slug (mirrors the backend rule)
const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['"!:@*+~.()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const BlogForm = ({ slug, onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    excerpt: "",
    content: "",
    image: "",
  });

  // Was the slug auto-derived from the title, or hand-edited by the admin?
  const [slugTouched, setSlugTouched] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch single blog if editing (slug is provided)
  useEffect(() => {
    if (slug) {
      const fetchBlogDetails = async () => {
        try {
          setFetching(true);
          const res = await fetch(`${API_URL}/blogs/${slug}`);
          const data = await res.json();
          const blog = data?.blog || data;

          if (blog) {
            setFormData({
              title: blog.title || "",
              slug: blog.slug || "",
              metaTitle: blog.metaTitle || "",
              metaDescription: blog.metaDescription || "",
              excerpt: blog.excerpt || "",
              content: blog.content || "",
              image: blog.image || "",
            });
            setSlugTouched(true); // existing post already has a real URL
            setImagePreview(blog.image || "");
          }
        } catch (err) {
          console.error("Failed to fetch blog details:", err);
        } finally {
          setFetching(false);
        }
      };

      fetchBlogDetails();
    }
  }, [slug]);

  // Handle standard input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // Keep the URL in sync with the title until the admin edits it themselves
      if (name === "title" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setSlugTouched(true);
    setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
  };

  // Handle Rich Text Content change
  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let imageUrl = formData.image;

      // Upload image to Cloudinary first if a new file was chosen
      if (imageFile) {
        const uploadResult = await uploadToCloudinary(imageFile);
        imageUrl = uploadResult.url;
      }

      const endpoint = slug ? `${API_URL}/blogs/${slug}` : `${API_URL}/blogs`;
      const method = slug ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          excerpt: formData.excerpt,
          content: formData.content,
          image: imageUrl,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save blog post");
      }

      alert(slug ? "Blog updated successfully!" : "Blog created successfully!");
      if (onBack) onBack();
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.message || "Something went wrong while saving the blog.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm";

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-300 transition"
        >
          ← Back
        </button>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            {slug ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. The Complete Guide to Renting a Room in the UK | Checklist"
                className={inputClass}
              />
              <p className="text-xs text-slate-400 mt-1">
                Internal name shown in the dashboard and blog cards.
              </p>
            </div>

            {/* URL / SLUG */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Blog URL (slug)
              </label>
              <div className="flex items-center rounded-lg border overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                <span className="px-3 py-2 bg-slate-50 text-slate-400 text-xs border-r select-none whitespace-nowrap">
                  rentaroomlondon.co.uk/
                </span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  required
                  placeholder="complete-guide-checklist-renting-room-uk"
                  className="flex-1 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                This is the full page URL. Lowercase letters, numbers and dashes
                only. Changing this on an existing post changes its live link.
              </p>
            </div>

            {/* SEO META TITLE */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                maxLength={120}
                placeholder="Shown in Google results & browser tab"
                className={inputClass}
              />
              <p className="text-xs text-slate-400 mt-1">
                {formData.metaTitle.length}/120 · Leave blank to use the Blog
                Title.
              </p>
            </div>

            {/* SEO META DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Meta Description (SEO)
              </label>
              <textarea
                name="metaDescription"
                rows={2}
                value={formData.metaDescription}
                onChange={handleChange}
                maxLength={320}
                placeholder="Everything you need to know before renting a room in the UK..."
                className={inputClass}
              />
              <p className="text-xs text-slate-400 mt-1">
                {formData.metaDescription.length}/320 · Leave blank to use the
                Excerpt.
              </p>
            </div>

            {/* SHORT DESCRIPTION / EXCERPT */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Short Description (Excerpt)
              </label>
              <textarea
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                required
                maxLength={300}
                placeholder="Write a brief summary shown on the blog list cards..."
                className={inputClass}
              />
            </div>

            {/* RICH TEXT CONTENT EDITOR */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Full Content
              </label>
              <div className="bg-white rounded-lg overflow-hidden border blog-editor [&_.ql-container]:text-[15px]! [&_.ql-editor]:min-h-90 [&_.ql-toolbar]:sticky [&_.ql-toolbar]:top-0 [&_.ql-toolbar]:z-10 [&_.ql-toolbar]:bg-white">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your rich blog content here..."
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Full formatting toolbar — headings, font size, bold/italic/underline,
                text &amp; highlight colour, alignment, ordered &amp; bullet lists,
                indentation, quotes, tables via lists, links, images and video. Use
                the eraser icon to clear formatting.
              </p>
            </div>

            {/* ONE IMAGE UPLOAD */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Featured Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border rounded-lg cursor-pointer text-sm font-medium text-slate-700 transition">
                  <Upload size={16} />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-500">
                  {imageFile ? imageFile.name : "No file chosen"}
                </span>
              </div>

              {imagePreview && (
                <div className="mt-4 w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
              >
                {loading && <Loader2 className="animate-spin" size={16} />}
                {slug ? "Update Blog Post" : "Publish Blog Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
