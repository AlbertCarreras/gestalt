// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, IconButton, Tooltip } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Tooltip text="Customize performance stats for your paid ads">
        <IconButton
          accessibilityLabel="Settings"
          bgColor="white"
          icon="cog"
          iconColor="darkGray"
          size="lg"
        />
      </Tooltip>
    </Box>
  );
}
