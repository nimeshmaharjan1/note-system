import MainLayout from "@components/Layout";
import { useSession } from "next-auth/react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession();
  return <div>Hello</div>;
};

export default Home;
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
