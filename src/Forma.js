import { Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { useGlobalContext } from "./FetchDat";

const Forma = () => {
  const { error, handleFormy, handleZmeny } = useGlobalContext();

  return (
    <>
      <section>
        <Form>
          <h2 className="text-center mb-5">Nastav Kvíz</h2>
          <FormGroup>
            <Label for="pocet">Počet otázok</Label>
            <Input
              onChange={handleZmeny}
              id="pocet"
              name="pocet"
              placeholder="10"
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="kategoria">Kategória</Label>
            <Input
              id="kategoria"
              name="kategoria"
              type="select"
              onChange={handleZmeny}
            >
              <option value="sport">Šport</option>
              <option value="animals">Zvieratá</option>
              <option value="celebrities">Celebrity</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="obtiaznost">Obtiažnosť</Label>
            <Input
              id="obtiaznost"
              name="obtiaznost"
              type="select"
              onChange={handleZmeny}
            >
              <option value="easy">Ľahká</option>
              <option value="medium">Stredná</option>
              <option value="hard">Ťažká</option>
            </Input>
          </FormGroup>
          {error && (
            <Alert color="danger">
              Nedokážem vygenerovať otázky, vyskúšajte iné možnosti.
            </Alert>
          )}
          <div className="text-center mt-5">
            <button className="btn btn-primary" onClick={handleFormy}>
              Začni kvíz
            </button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default Forma;
