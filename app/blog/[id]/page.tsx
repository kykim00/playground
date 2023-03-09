interface PageParams {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageParams) => {
  return <h1>New Page{params.id}</h1>;
};

export default Page;
