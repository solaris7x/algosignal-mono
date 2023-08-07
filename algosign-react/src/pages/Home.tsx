import { Icon } from "@iconify/react/dist/iconify.js";
import GridItem from "../components/home/GridItem";

const Home = () => {
  return (
    <div className="min-h-[50vh]">
      {/* Intro + tagline */}
      <div className="min-h-[40vh] py-8 text-center flex flex-col justify-center items-center">
        <a href="/" className="text-blue-700">
          <h1 className="text-4xl font-semibold flex items-center justify-center gap-2">
            <Icon icon="ic:sharp-rocket-launch" className="md:text-4xl" />
            AlgoSignal
          </h1>
        </a>
        <div className="py-2">Your Events signed with JWT in browser!!</div>
      </div>
      {/* Features */}
      <section id="features" className="p-10">
        <a href="#features">
          <h2 className="text-3xl hover:text-blue-700 flex items-center justify-center gap-2 text-center">
            <Icon icon="bi:gear-fill" className="" />
            Features
          </h2>
        </a>
        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridItem
            icon="carbon:flash-filled"
            title="Fast"
            description="No wait times, no queues, fast and easy"
          />
          <GridItem
            icon="bi:shield-lock-fill"
            title="Secure"
            description="Your data never leaves your browser"
          />
          <GridItem
            icon="el:fire"
            title="No Watermark"
            description="All our services are free to use with no watermark"
          />
        </div>
      </section>
      {/* Tools grid */}
      <section id="tools" className="p-8">
        <a href="#tools">
          <h2 className="text-3xl hover:text-blue-700 flex items-center justify-center gap-2 text-center">
            <Icon icon="carbon:tools" className="" />
            Tools
          </h2>
        </a>
        <div className="my-8 mx-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* <Link to="/merge"> */}
          <GridItem
            icon="carbon:direction-merge-filled"
            title="Merge PDF"
            description="Merge multiple PDFs into one"
          />
          {/* </Link> */}
          {/* <Link to="/"> */}
          <GridItem
            icon="gg:reorder"
            title="Reorder Pages (planned)"
            description="Reoder pages in a PDF"
          />
          {/* </Link> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
