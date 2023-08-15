import React from "react";

const ConfirmedOrders = ({ orders }: any) => {
  return (
    <div className="confirmedOrder-card w-full">
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-grey">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-xs text-center text-black uppercase "
            >
              Date
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-xs text-center text-black uppercase "
            >
              Time
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-xs text-center text-black uppercase "
            >
              Item
            </th>

            <th
              scope="col"
              className="px-3 py-3 text-xs font-bold text-center text-black uppercase "
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-xs font-bold text-center text-black uppercase "
            >
              Amount
            </th>
          </tr>
        </thead>
        {orders.map((order: any) => {
          return (
            <tbody key={order._id} className="divide-y divide-gray-200">
              <tr key={order._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {order.createdAt.slice(0, 10)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.createdAt.slice(11, 16)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.products.map((product: any) => (
                    <p key={product._id}>{product.title}</p>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.products.map((product: any) => (
                    <p key={product._id}>{product.quantity}</p>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.products.map((product: any) => (
                    <p key={product._id}>{product.price}</p>
                  ))}
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  Total
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.total / 100}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default ConfirmedOrders;
