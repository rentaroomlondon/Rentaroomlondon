"use client";
import React, { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import BlogForm from "./BlogForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ================= FETCH ALL =================
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/blogs`);
      const data = await res.json();
      setBlogs(data?.blogs || data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (slug) => {
    const confirmDelete = confirm("Delete this blog post?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/blogs/${slug}`, {
        method: "DELETE",
      });

      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ================= FORM VIEW =================
  if (showForm) {
    return (
      <BlogForm
        slug={selectedSlug}
        onBack={() => {
          setShowForm(false);
          setSelectedSlug(null);
          fetchBlogs();
        }}
      />
    );
  }

  // ================= MAIN UI (LIST VIEW) =================
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Blog Management
          </h1>

          <button
            onClick={() => {
              setSelectedSlug(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            <Plus size={16} />
            Add Blog
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-500" size={32} />
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-slate-500 mt-10">
            No blog posts found 🚀
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {blogs.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                {/* IMAGE */}
                <div className="w-full h-44 bg-gray-100">
                  <img
                    src={item.image || item.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* TITLE */}
                    <h2 className="text-base font-semibold text-slate-800 line-clamp-1">
                      {item.title}
                    </h2>

                    {/* EXCERPT / DESCRIPTION */}
                    <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                      {item.excerpt || item.description || "No description provided."}
                    </p>

                    {/* DATE */}
                    <p className="text-xs text-gray-400 mt-2">
                      Published: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        setSelectedSlug(item.slug);
                        setShowForm(true);
                      }}
                      className="flex-1 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.slug)}
                      className="flex-1 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;