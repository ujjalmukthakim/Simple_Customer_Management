import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from './api/api'; 

function App() {
  const [customers, setCustomer] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const getInfo = async () => {
    try {
      const res = await api.get();
      setCustomer(res.data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const Onsubmit = async (data) => {
    try {
      if (editingCustomer) {
        await api.patch(`/${editingCustomer.id}/`, data);
        setEditingCustomer(null); 
      } else {
        await api.post('', data);
      }
      reset({
      name: "",
      email: "",
      address: "",
      Phone: ""
    });
      getInfo(); 
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}/`);
      setCustomer(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    reset({
      name: customer.name,
      email: customer.email,
      address: customer.address,
      Phone: customer.Phone
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Customer Management</h1>

        {/* Form Section */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-10 border border-gray-100">
          <form onSubmit={handleSubmit(Onsubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                {...register('name', { required: "Name is required" })} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                placeholder="Name.."
              />
              {errors.name && <span className="text-red-500 text-xs mt-1 italic">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                {...register('email', { required: "Email is required" })} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                placeholder="myemail@example.com"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 italic">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                type="text" 
                {...register('address', { required: "Address is required" })} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                placeholder="1202, Dhaka"
              />
              {errors.address && <span className="text-red-500 text-xs mt-1 italic">{errors.address.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                {...register('Phone', { required: "Phone is required" })} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                placeholder="+880"
              />
              {errors.Phone && <span className="text-red-500 text-xs mt-1 italic">{errors.Phone.message}</span>}
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 transform active:scale-95"
              >
                {editingCustomer ? "Update Customer" : "Add Customer"}
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Edit</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-300 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.Phone}</td>

                    {/* Edit Button */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </button>
                    </td>

                    {/* Delete Button */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {customers.length === 0 && (
              <p className="p-8 text-center text-gray-500 italic">No customers added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
