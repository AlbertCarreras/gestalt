// @flow strict
import { type Node, useState } from 'react';
import {
  Flex,
  Layer,
  Modal,
  Box,
  Text,
  DeviceTypeProvider,
  Button,
  FixedZIndex,
  CompositeZIndex,
} from 'gestalt';

export default function Example(): Node {
  const [showModal, setShowModal] = useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);

  return (
    <DeviceTypeProvider deviceType="mobile">
      {showModal ? (
        <Layer zIndex={new CompositeZIndex([HEADER_ZINDEX])}>
          <Modal
            align="center"
            accessibilityModalLabel="Mobile Modal example"
            heading="Heading"
            subHeading="SubHeading"
            onDismiss={() => setShowModal(false)}
            footer={
              <Flex justifyContent="center" gap={2}>
                <Button color="gray" text="Secondary" />
                <Button color="red" text="Primary" />
              </Flex>
            }
            size="lg"
          >
            <Box>{Array(100).fill(<Text>Content</Text>)}</Box>
          </Modal>
        </Layer>
      ) : null}
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowModal(true)}
        />
      </Box>
    </DeviceTypeProvider>
  );
}
