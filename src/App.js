import Forma from "./Forma";
import Vyhodnotenie from "./Vyhodnotenie";
import { useGlobalContext } from "./FetchDat";
import Nacitanie from "./Nacitanie";
import { Button } from "reactstrap";

function App() {
  const {
    otazky,
    cakanie,
    nacitanie,
    index,
    spravne,
    dalsiaOtazka,
    spravnaOdpoved,
    vyhodnotenie,
  } = useGlobalContext();

  if (cakanie) return <Forma />;
  if (nacitanie) return <Nacitanie />;

  const { question, correct_answer, incorrect_answers } = otazky[index];
  const odpovede = [...incorrect_answers, correct_answer];
  let zamiesanie = odpovede.sort(() => Math.random() - 0.5);

  if (vyhodnotenie) return <Vyhodnotenie />;
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">React projekt - Quiz</h1>
        <div className="otazky">
          <h1 className="text-center ">{index + 1}.</h1>
          <p className="spravne-odpovede">
            Správne odpovede: {spravne} z {otazky.length}
          </p>
          <h4 className="mb-5" dangerouslySetInnerHTML={{ __html: question }} />
          {zamiesanie.map((odpoved, index) => {
            return (
              <Button
                onClick={() => spravnaOdpoved(odpoved)}
                className="odpoved"
                color="primary"
                key={index}
                dangerouslySetInnerHTML={{ __html: odpoved }}
              />
            );
          })}

          <Button
            color="warning"
            className="odpoved-dalsia"
            onClick={dalsiaOtazka}
          >
            Ďalšia otázka
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
