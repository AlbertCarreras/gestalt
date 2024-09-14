import { useState } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function SearchFieldExample() {
  const [searchValue, setSearchValue] = useState('');
  const [lgValue, setLgValue] = useState('');
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel=""
          id="searchfield_size_md_label"
          onChange={({ value }) => setSearchValue(value)}
          placeholder="Search by name"
          value={searchValue}
        />
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel=""
          id="searchfield_size_md_nolabel"
          label="Search Messages"
          onChange={({ value }) => setSearchValue(value)}
          placeholder="Search by name"
          value={searchValue}
        />
           <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel=""
          id="searchfield_size_lg_label"
          onChange={({ value }) => setLgValue(value)}
          placeholder="Search by name"
          size="lg"
          value={lgValue}
        />
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel=""
          id="searchfield_size_lg_nolabel"
          label="Search Messages"
          onChange={({ value }) => setLgValue(value)}
          placeholder="Search by name"
          size="lg"
          value={lgValue}
        />
      </Flex>
    </Box>
  );
}
