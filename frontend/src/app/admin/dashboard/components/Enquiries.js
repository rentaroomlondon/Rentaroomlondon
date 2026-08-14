"use client";

import { useEffect, useState } from "react";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/enquiries`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch enquiries");
        }

        const data = await res.json();
        setEnquiries(data.data || []);
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return <p className="p-6">Loading enquiries...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">
          Enquiries ({enquiries.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Area</th>
              <th className="px-6 py-3">Budget</th>
              <th className="px-6 py-3">Move-in</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {enquiries.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No enquiries found
                </td>
              </tr>
            ) : (
              enquiries.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.email}
                  </td>

                  <td className="px-6 py-4">
                    {item.phone}
                  </td>

                  <td className="px-6 py-4">
                    {item.area || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.budget ? `£${item.budget}` : "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.moveIn || "-"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
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

export default Enquiries;