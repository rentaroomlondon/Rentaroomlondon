"use client";

import { useEffect, useState } from "react";

const ContactLeads = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/contact`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await res.json();

        setContacts(data.data || []);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <p className="p-6">Loading contact leads...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">
          Contact Leads ({contacts.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Contact Method</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No contact leads found
                </td>
              </tr>
            ) : (
              contacts.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {item.title} {item.firstName} {item.lastName}
                  </td>

                  <td className="px-6 py-4">
                    {item.email}
                  </td>

                  <td className="px-6 py-4">
                    {item.phone}
                  </td>

                  <td className="px-6 py-4">
                    {item.contactMethod || "-"}
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    {item.message || "-"}
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

export default ContactLeads;