import RouletteWheel from "../components/rouletteWhele";

export default function Roul() {
  return <div>
    <RouletteWheel isSpinning={true} finalNumber={10} onSpinComplete={() => { console.log("done") }} />
  </div>
}
