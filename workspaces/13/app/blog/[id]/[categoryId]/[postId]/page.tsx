interface PageParams {
  params: {
    categoryId: string;
    postId: string;
    id: string;
  };
}

const Page = ({ params }: PageParams) => {
  return (
    <h1>
      New Page{params.categoryId} {params.postId} {params.id}
    </h1>
  );
};

export default Page;
