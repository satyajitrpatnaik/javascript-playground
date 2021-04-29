import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

const popover = (
  <Popover id="popover-basic">
    <Popover.Content>no ice cream will actually be delivered</Popover.Content>
  </Popover>
);

const SummaryForm = ({ ...props }) => {
  const [tcChecked, setTcChecked] = useState(false);
  const checkboxLabel = (
    <span>
      I agree to{" "}
      <span style={{ color: "blue" }}>
        <OverlayTrigger placement="right" overlay={popover}>
          <Button variant="success">Terms and Conditions</Button>
        </OverlayTrigger>
      </span>
    </span>
  );

  return (
    <Form name="summaryForm">
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
