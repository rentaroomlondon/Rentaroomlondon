"use client";

import { useEffect, useState } from "react";

const RoomLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/leads`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch room leads");
        }

        const data = await res.json();
        setLeads(data.data || []);
      } catch (err) {
        console.error("Failed to fetch room leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return <p className="p-6">Loading room leads...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">
          Room Leads ({leads.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No room leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {lead.name}
                  </td>

                  <td className="px-6 py-4">
                    {lead.phone}
                  </td>

                  <td className="px-6 py-4">
                    {lead.location || "-"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomLeads;