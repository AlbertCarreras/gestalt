// @flow strict
import { Fragment, useState, type Node } from 'react';
import { Box, Button, ModalAlert, CompositeZIndex, FixedZIndex, Layer, Text } from 'gestalt';

export default function DontHardLanguage(): Node {
  const [showComponent, setShowComponent] = useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowComponent(true)}
        />
      </Box>
      {showComponent ? (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Cancel order"
            heading="Are you sure?"
            primaryAction={{
              accessibilityLabel: 'Confirm cancel order',
              label: 'Cancel',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Keep current order',
              label: 'Cancel',
              onClick: () => {},
            }}
            onDismiss={() => {}}
          >
            <Text>
              There&apos;s only a few left in stock, and you may miss out on a bargain if you
              cancel. You may also incur unwanted fees.
            </Text>
          </ModalAlert>
        </Layer>
      ) : null}
    </Fragment>
  );
}
