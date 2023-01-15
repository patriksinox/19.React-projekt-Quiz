import { Button } from "reactstrap";
import { useGlobalContext } from "./FetchDat";

function Vyhodnotenie() {
  const { spravne, otazky, reset } = useGlobalContext();

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">React projekt - Quiz</h1>
        <div className="otazky text-center">
          <h2>
            {spravne > 0 ? ((100 / otazky.length) * spravne).toFixed(0) : 0} %
            úspešnosť odpovedí
          </h2>
          <h4 className="spravne-odpovede text-center mt-5">
            Odpovedal si správne na {spravne} z {otazky.length} otázok!
          </h4>

          <Button
            color="primary"
            className="odpoved-dalsia mt-5"
            onClick={reset}
          >
            Hraj znova!
          </Button>
        </div>
      </div>
    </>
  );
}

export default Vyhodnotenie;
