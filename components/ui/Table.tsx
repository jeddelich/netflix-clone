import { Product } from "@/typings";

function Table({ products }: { products: Product[] }) {
  const formatPrice = (amount: number | null | undefined) => {
    if (amount == null) return "-";
    return `$${(amount / 100).toFixed(2)}`;
  };

  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {formatPrice(product.prices?.[0]?.unit_amount)}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {product.metadata!.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {product.metadata!.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Supported devices</td>
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {product.metadata!.portability && "TV, computer, mobile phone, tablet"}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Devices your household can watch at the same time
          </td>
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {product.metadata!.watchDevices}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Download devices
          </td>
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {product.metadata!.downloadDevices}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Ads
          </td>
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {product.metadata!.ads === "true" ? "Yes" : "No"}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
