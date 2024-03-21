// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
import { Box, Dropdown, Flex, IconButton } from 'gestalt';

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    $ReadOnlyArray<{ label: string, subtext?: string, value: string }>,
  >([]);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  const onSelect = ({
    item,
  }: {
    event: SyntheticInputEvent<HTMLInputElement>,
    item: { label: string, subtext?: string, value: string },
  }) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selectedValue) => selectedValue.filter(({ value }) => value !== item.value));
    } else {
      setSelected((selectedValue) => [...selectedValue, item]);
    }
  };

  return (
    <Box padding={4}>
      <Flex justifyContent="center" width="100%">
        <IconButton
          ref={anchorRef}
          accessibilityControls="accessibility-example"
          accessibilityExpanded={open}
          accessibilityHaspopup
          accessibilityLabel="Create Pin Menu"
          bgColor="lightGray"
          icon="add"
          iconColor="darkGray"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
          size="lg"
          tooltip={{ text: 'Create Pin', idealDirection: 'up' }}
        />
        {open && (
          <Dropdown
            anchor={anchorRef.current}
            id="accessibility-example"
            onDismiss={() => setOpen(false)}
          >
            <Dropdown.Section label="Create">
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: 'Pin', label: 'Pin' }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: 'Story Pin', label: 'Story Pin' }}
                selected={selected}
              />
            </Dropdown.Section>
          </Dropdown>
        )}
      </Flex>
    </Box>
  );
}
