import Nav from "../components/nav";
import SendSol from "../components/sendSol";

export default function MainApp() {
  return <div>
    <Nav />
    <div className="flex justify-center items-center">
      <SendSol />
    </div>
  </div>
}
