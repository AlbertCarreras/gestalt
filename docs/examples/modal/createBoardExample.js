// @flow strict
import { Fragment, type Node, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  Modal,
  TextField,
} from 'gestalt';

export default function HeadingExample(): Node {
  const [shouldShow, setShouldShow] = useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box padding={8}>
      <Button text="View Modal" onClick={() => setShouldShow(true)} />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <Modal
            accessibilityModalLabel="Create new board"
            align="start"
            heading="Create board"
            onDismiss={() => setShouldShow(false)}
            footer={
              <Flex alignItems="center" justifyContent="end">
                <Button color="red" text="Create" />
              </Flex>
            }
            size="sm"
          >
            <Fragment>
              <Box marginBottom={6}>
                <TextField
                  id="name"
                  onChange={() => {}}
                  placeholder='Like "Places to go" or "Recipes to Make"'
                  label="Name"
                  type="text"
                />
              </Box>
              <Checkbox
                checked={false}
                id="secret"
                label="Keep this board secret"
                helperText="So only you and collaborators can see it."
                name="languages"
                onChange={() => {}}
              />
            </Fragment>
          </Modal>
        </Layer>
      )}
    </Box>
  );
}
