// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, Button, ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoClearCommunicate(): Node {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowModal(true)}
        />
      </Box>
      {showModal ? (
        <Layer zIndex={zIndex}>
          <ModalAlert
            type="error"
            accessibilityModalLabel="Unable to charge card"
            heading="Your credit card has expired"
            primaryAction={{
              accessibilityLabel: 'Acknowledge expired card',
              label: 'Got it',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Text>
              The card we have on file is no longer valid. Update it to continue running campaigns.
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
