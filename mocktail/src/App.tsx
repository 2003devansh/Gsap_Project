import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <div className="flex-center h-screen">
      <div className="text-3xl text-indigo-300 ">Hello GSAP !</div>
    </div>
  );
};

export default App;
