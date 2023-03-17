interface PageParams {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageParams) => {
  const data = await getData();
  return <h1>New Page{params.id}</h1>;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getData() {
  await delay(3000).then(() => {});
  return true;
}
export default Page;
