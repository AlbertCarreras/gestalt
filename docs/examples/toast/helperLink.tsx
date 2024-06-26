import { Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Toast
        dismissButton={{ onDismiss: () => {} }}
        helperLink={{
          text: 'Go to settings',
          accessibilityLabel: 'Go to settings',
          href: '#',
        }}
        text="Your address was updated."
      />
    </Flex>
  );
}
