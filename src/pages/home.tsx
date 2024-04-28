import { NavigateFunction, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div>
      <h1 className="font-bold font-sans text-indigo-400 text-6xl text-center"> BudgetUp </h1>
      <button onClick={() => navigate("/login")}>Get Started</button>
    </div>
  );
};
