import { Suspense } from 'react';

interface PageParams {
  params: {};
}

// function delay(ms: number) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve(console.log(`${ms}ms delay`));
//     }, ms);
//   });
// }
// async function getData() {
//   const data = await fetch('http://localhost:3001/api/hello');
//   await delay(2000);
//   return data.json();
// }
const Page = async ({ params }: PageParams) => {
  // const data = await getData();

  return (
    <>
      <h1>New Page</h1>
      {/* <Suspense fallback={<div>loading...</div>}>
        {data.map((person: any) => {
          const { name, phone, email, list, country, region } = person;
          return (
            <ul
              key={name}
              style={{
                backgroundColor: 'pink',
                padding: '20px',
                marginRight: '10px',
                display: 'inline-block',
                color: 'black',
              }}
            >
              <li>name : {name}</li>
              <li>phone : {phone}</li>
              <li>email : {email}</li>
              <li>list : {list}</li>
              <li>country : {country}</li>
              <li>region : {region}</li>
            </ul>
          );
        })}
      </Suspense> */}
    </>
  );
};

export default Page;
