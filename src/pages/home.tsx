import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "react-aria-components";

export const Home = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div>
      <h1 className="font-bold font-sans text-indigo-400 text-6xl text-center py-10"> BudgetUp </h1>
      <div className="flex justify-center items-center py-5">
        <Button className="border rounded-lg bg-indigo-600 text-indigo-300 px-5 py-2" onPress={() => navigate("/portfolios")}>Get Started</Button>
      </div>
    </div>
  );
};
