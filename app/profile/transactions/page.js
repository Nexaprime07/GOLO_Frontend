import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProfileSidebar from '../../../components/ProfileSidebar';

const transactions = [
  {
    id: 1,
    adTitle: "Maths Tuition - Pune",
    template: "Education",
    details: "3 days, Featured Ad",
    amount: "₹45",
    date: "2026-03-01",
  },
  {
    id: 2,
    adTitle: "iPhone 14 Pro Sale",
    template: "Electronics",
    details: "5 days, Featured Ad",
    amount: "₹118",
    date: "2026-02-15",
  },
  {
    id: 3,
    adTitle: "Dog for Adoption",
    template: "Pets",
    details: "2 days, Regular Ad",
    amount: "₹10",
    date: "2026-01-28",
  },
];

export default function TransactionHistory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      <Navbar />
      <div className="flex max-w-6xl mx-auto pt-8 pb-16 px-4 lg:px-0">
        <ProfileSidebar />
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8 ml-8">
          <h2 className="text-2xl font-semibold text-[#157A4F] mb-6">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-50">
                  <th className="py-3 px-4">Ad Title</th>
                  <th className="py-3 px-4">Template</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{tx.adTitle}</td>
                    <td className="py-2 px-4">{tx.template}</td>
                    <td className="py-2 px-4">{tx.details}</td>
                    <td className="py-2 px-4 font-bold text-green-700">{tx.amount}</td>
                    <td className="py-2 px-4">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
