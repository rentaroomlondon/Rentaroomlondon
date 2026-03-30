"use client";

import { useEffect, useState } from "react";

const Maintenance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const fetchMaintenance = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/maintenance`,
        { credentials: "include" }
      );

      const result = await res.json();

      if (result.success) {
        setData(result.maintenance);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenance();
  }, []);

  const markComplete = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/maintenance/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "Completed",
            sendEmail: true,
          }),
        }
      );

      fetchMaintenance();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50">

        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-50">
          <h2 className="font-bold text-lg">All Maintenance Requests</h2>
          <span className="text-sm text-gray-400">
            {data.length} Requests
          </span>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-10 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
          <div>Tenant</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Status</div>
          <div>Dates</div>
          <div>Description</div>
          <div>Address</div>
          <div>Access</div>
          <div>Photos</div>
          <div>Action</div>
        </div>

        {/* Body */}
        <div className="divide-y">
          {loading ? (
            <p className="p-6 text-sm text-gray-400">Loading...</p>
          ) : data.length === 0 ? (
            <p className="p-6 text-sm text-gray-400">No requests</p>
          ) : (
            data.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-10 gap-3 items-start px-6 py-4 text-sm hover:bg-gray-50 transition"
              >

                {/* Tenant */}
                <div>
                  <p className="font-semibold text-slate-900">
                    {item.firstName || "User"} {item.lastName || ""}
                  </p>
                  <p className="text-xs text-gray-400">{item.email || "-"}</p>
                  <p className="text-xs text-gray-400">{item.phone || "-"}</p>
                </div>

                {/* Category */}
                <div>{item.category || "-"}</div>

                {/* Priority */}
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold
                    ${
                      item.priority === "Urgent"
                        ? "bg-red-100 text-red-600"
                        : item.priority === "Routine"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                    {item.priority}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold
                    ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Assigned"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}>
                    {item.status}
                  </span>
                </div>

                {/* Dates */}
                <div className="text-xs text-gray-500">
                  <p>
                    <span className="font-medium">Issue:</span>{" "}
                    {item.issueStarted
                      ? new Date(item.issueStarted).toLocaleDateString()
                      : "-"}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Description */}
                <div className="text-xs text-gray-500 max-w-[180px]">
                  <p className="line-clamp-2">
                    {item.description || "-"}
                  </p>
                  {item.description && item.description.length > 60 && (
                    <button
                      onClick={() => setSelectedDescription(item.description)}
                      className="text-blue-500 text-xs mt-1"
                    >
                      View more
                    </button>
                  )}
                </div>

                {/* Address */}
                <div className="text-xs text-gray-500 max-w-[150px]">
                  {item.address || "-"}
                </div>

                {/* Access */}
                <div className="text-xs">
                  <p>{item.contactTime || "-"}</p>
                  <p className="text-gray-400">{item.access || "-"}</p>
                </div>

                {/* Photos */}
                <div className="flex gap-2 overflow-x-auto max-w-[140px]">
                  {item.photos && item.photos.length > 0 ? (
                    item.photos.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="photo"
                        onClick={() => setSelectedImage(img)}
                        className="w-12 h-12 object-cover rounded-md shrink-0 cursor-pointer hover:scale-105 transition"
                      />
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </div>

                {/* Action */}
                <div>
                  {item.status !== "Completed" && (
                    <button
                      onClick={() => markComplete(item._id)}
                      className="text-xs px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
                    >
                      Complete
                    </button>
                  )}
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* 🔥 IMAGE MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
          />
        </div>
      )}

      {/* 🔥 DESCRIPTION MODAL */}
      {selectedDescription && (
        <div
          onClick={() => setSelectedDescription(null)}
          className="fixed inset-0 flex items-center justify-center z-50 p-6"
        >
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="font-bold mb-3">Full Description</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {selectedDescription}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Maintenance;