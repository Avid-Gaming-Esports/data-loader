import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

import '../style/Accordion.css';

function Metadata() {
  return (
  <Accordion className="metadata">
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1">
        Metadata Options
      </Accordion.Toggle>
    </Card>
  </Accordion>
  );
}

export default Metadata;