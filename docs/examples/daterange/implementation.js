// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Flex, IconButton, Layer, Popover, Status } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [selectedDates, setSelectedDates] = useState<[Date, Date] | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showComponent, setShowComponent] = useState(true);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Flex width="100%" height="100%" alignContent="start" justifyContent="start">
      <Box padding={8}>
        <Flex gap={2} alignItems="center">
          <Status
            type={selectedDates ? 'ok' : 'problem'}
            title={selectedDates ? 'Campaign dates selected' : 'Select dates'}
            subtext={
              selectedDates
                ? `${selectedDates[0].getMonth()}/${selectedDates[0].getDay()}/${selectedDates[0].getFullYear()} - ${selectedDates[1].getMonth()}/${selectedDates[1].getDay()}/${selectedDates[1].getFullYear()}`
                : undefined
            }
          />
          <IconButton
            accessibilityLabel="Open calendar"
            icon="edit"
            selected={showComponent}
            onClick={() => setShowComponent((value) => !value)}
            ref={anchorRef}
          />
        </Flex>
      </Box>

      {showComponent ? (
        <Layer>
          <Popover
            size="flexible"
            positionRelativeToAnchor={false}
            onDismiss={() => {}}
            anchor={anchorRef.current}
            idealDirection="down"
          >
            <DateRange
              endDateValue={endDate}
              onEndDateChange={({ value }) => setEndDate(value)}
              onEndDateError={({ errorMessage, value }) => console.log(errorMessage, value)}
              onStartDateError={({ errorMessage, value }) => console.log(errorMessage, value)}
              onStartDateChange={({ value }) => setStartDate(value)}
              onSubmit={() => {
                if (startDate && endDate) setSelectedDates([startDate, endDate]);
                setShowComponent(false);
              }}
              startDateValue={startDate}
              onCancel={() => {
                setStartDate(null);
                setEndDate(null);
                setShowComponent(false);
              }}
            />
          </Popover>
        </Layer>
      ) : null}
    </Flex>
  );
}
