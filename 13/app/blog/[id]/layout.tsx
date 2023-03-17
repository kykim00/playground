export const metadata = {
  title: 'Blog',
  description: 'Blog',
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default BlogLayout;
