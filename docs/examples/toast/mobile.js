// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, DeviceTypeProvider, Flex, Icon, Toast } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <DeviceTypeProvider deviceType="mobile">
      <Box color="successWeak">
        <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
          <Toast
            primaryAction={{
              accessibilityLabel: 'Edit',
              label: 'Edit',
              role: 'button',
              onClick: () => {},
            }}
            text="Save the link from your clipboard?"
            thumbnail={{
              icon: <Icon accessibilityLabel="Go to next steps" icon="link" />,
            }}
          />
        </Flex>
      </Box>
    </DeviceTypeProvider>
  );
}
