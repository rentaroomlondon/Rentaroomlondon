"use client";

import React, { useEffect, useState } from "react";
import { useStaffAuth } from "@/app/Context/StaffAuthContext";

const MaintenanceDashboard = () => {
  const { staff } = useStaffAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!staff?._id) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/staff/${staff._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async (maintenanceId) => {
    try {
      // ✅ Call your existing updateMaintenance API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/maintenance/${maintenanceId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Completed" }),
          credentials: "include",
        }
      );

      const result = await res.json();

      if (res.ok) {
        console.log("Task completed and emails sent!", result);
        fetchTasks(); // refresh the task list
      } else {
        console.error("Failed to complete task:", result.message);
      }
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [staff]);

  if (loading) return <p className="text-center p-5">Loading tasks…</p>;
  if (tasks.length === 0)
    return (
      <p className="text-center text-gray-500 p-5">No assigned tasks 😎</p>
    );

  return (
    <div className="mt-4 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Assigned Maintenance Tasks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-100 hover:shadow-xl transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="font-semibold text-lg">{task.category}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === "Urgent"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Routine"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {task.status !== "Completed" && (
                <button
                  onClick={() => markComplete(task._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  Mark Completed
                </button>
              )}
            </div>

            {/* Status */}
            <div className="flex gap-2 items-center mb-3">
              <span className="text-sm font-medium">Status:</span>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-2 text-sm">
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {task.description}
              </p>
              <p>
                <span className="font-semibold">Tenant:</span>{" "}
                {task.firstName} {task.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {task.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {task.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {task.address}
              </p>
              <p>
                <span className="font-semibold">Contact Time:</span>{" "}
                {task.contactTime}
              </p>
              <p>
                <span className="font-semibold">Access:</span> {task.access}
              </p>
              <p>
                <span className="font-semibold">Issue Started:</span>{" "}
                {task.issueStarted
                  ? new Date(task.issueStarted).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span>{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "Not set"}
              </p>
              <p>
                <span className="font-semibold">Assigned Staff:</span>{" "}
                {task.assignedStaff?.name || "N/A"}
              </p>
            </div>

            {/* Photos */}
            {task.photos?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-1 text-sm">Photos:</p>
                <div className="grid grid-cols-3 gap-2">
                  {task.photos.map((photo, idx) => (
                    <a key={idx} href={photo} target="_blank" className="block">
                      <img
                        src={photo}
                        alt={`photo-${idx}`}
                        className="h-20 w-full object-cover rounded-md border"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceDashboard;