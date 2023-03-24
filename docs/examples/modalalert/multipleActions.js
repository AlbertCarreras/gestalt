// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, Button, ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function MultipleActions(): Node {
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
            accessibilityModalLabel="Delete current Pin draft confirmation"
            heading="Delete this draft?"
            primaryAction={{
              accessibilityLabel: 'Delete draft',
              label: 'Delete',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel, keep editing',
              label: 'Return to editing',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Text>Deleting this draft cannot be undone. Are you sure you want to delete?</Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
