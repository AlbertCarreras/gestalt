// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Icon } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Icon accessibilityLabel="pin code" color="default" icon="pincode" size={32} />
    </Box>
  );
}
