import Options from "./Options/Options";

export default function OrderEntry() {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}
