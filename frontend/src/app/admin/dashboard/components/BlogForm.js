"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Upload } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR window is not defined issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import uploadToCloudinary from "@/app/utils/uploadToCloudinary";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BlogForm = ({ slug, onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
  });

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
              excerpt: blog.excerpt || "",
              content: blog.content || "",
              image: blog.image || "",
            });
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          excerpt: formData.excerpt,
          content: formData.content,
          image: imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to save blog post");

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
                placeholder="Enter blog title..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
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
                placeholder="Write a brief summary of the blog post..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            {/* RICH TEXT CONTENT EDITOR */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Full Content
              </label>
              <div className="bg-white rounded-lg overflow-hidden border">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your rich blog content here..."
                  className="h-64 mb-12"
                />
              </div>
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