import MainLayout from "@components/Layout";
import { useSession } from "next-auth/react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Dan D. Repairs!</h1>
      <p>
        Located in beautiful Downtown Foo City, Dan D. Repairs provides a trained staff to meet your
        tech repair needs.
      </p>
      <p className="mt-4 italic">
        Dan D. Repairs <br />
        555 Foo Drive <br /> Foo City, CA 12345 <br />
        (555)555-555
      </p>
    </div>
  );
};

export default Home;
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
