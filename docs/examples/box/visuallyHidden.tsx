import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Text>Enable your screen reader to hear the following text:</Text>
      <Box position="relative">
        <Box display="visuallyHidden">Hi there.</Box>
      </Box>
    </Flex>
  );
}
