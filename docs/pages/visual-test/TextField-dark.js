// @flow strict
import { type Node } from 'react';
import { TextField, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1} width={300}>
        <TextField
          helperText="Password should be at least 20 characters long"
          id="variants-helper-text"
          label="Password"
          onChange={() => {}}
          type="password"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
