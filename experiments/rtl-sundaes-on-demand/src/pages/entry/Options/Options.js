import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import AlertBanner from "../../common/AlertBanner";
import ScoopOptions from "../ScoopOption/ScoopOption";
import ToppingOption from "../ToppingOption/ToppingOption";

export default function Options({ optionType }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  const OptionComponent =
    optionType === "scoops" ? ScoopOptions : ToppingOption;

  const optionItems = options.map((option) => (
    <OptionComponent key={option.name} {...option} />
  ));
  if (error) {
    return <AlertBanner />;
  }

  return <Row>{optionItems}</Row>;
}
