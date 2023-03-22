import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Products } from '../api/table';

const Table = () => {
  const [data, setData] = useState<Products>();
  // const { register, handleSubmit } = useForm({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (data) return;
    try {
      const res = await axios.get<Products>('https://dummyjson.com/products');
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(data);

  return (
    <div className="container">
      <Suspense fallback={<p>loading...</p>}>
        <form>
          <table className="table" style={{ display: 'table', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {Object.keys(data?.products[0] || {}).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.products.map(product => (
                <tr key={product.id}>
                  {Object.entries(product).map(([key, value]) => (
                    <td key={`${product.id}_${key}`}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </Suspense>
    </div>
  );
};

export default Table;
