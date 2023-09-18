// @flow strict
import { type Node, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Paid': 1000000,
      'Organic': 2000000,
      'Earned': 200000,
    },
    {
      name: new Date(2023, 1, 2).getTime(),
      'Paid': 2000000,
      'Organic': 2000000,
      'Earned': 400000,
    },
    {
      name: new Date(2023, 2, 3).getTime(),
      'Paid': 3000000,
      'Organic': 5000000,
      'Earned': 600000,
    },
    {
      name: new Date(2023, 3, 4).getTime(),
      'Paid': 2000000,
      'Organic': 3000000,
      'Earned': 700000,
    },
    {
      name: new Date(2023, 4, 5).getTime(),
      'Paid': 4000000,
      'Organic': 4000000,
      'Earned': 500000,
    },
    {
      name: new Date(2023, 5, 6).getTime(),
      'Paid': 1000000,
      'Organic': 7000000,
      'Earned': 200000,
    },
    {
      name: new Date(2023, 6, 7).getTime(),
      'Paid': 5000000,
      'Organic': 6000000,
      'Earned': 500000,
    },
    {
      name: new Date(2023, 7, 8).getTime(),
      'Paid': 6000000,
      'Organic': 2000000,
      'Earned': 200000,
    },
    {
      name: new Date(2023, 8, 8).getTime(),
      'Paid': 4000000,
      'Organic': 4000000,
      'Earned': 600000,
    },
    {
      name: new Date(2023, 9, 8).getTime(),
      'Paid': 10000000,
      'Organic': 5000000,
      'Earned': 700000,
    },
    {
      name: new Date(2023, 10, 8).getTime(),
      'Paid': 4000000,
      'Organic': 5500000,
      'Earned': 100000,
    },
    {
      name: new Date(2023, 11, 8).getTime(),
      'Paid': 3000000,
      'Organic': 7000000,
      'Earned': 200000,
    },
  ];

  return (
    <ChartGraph
      title="Engagement rate"
      accessibilityLabel="Engagement rate (example)"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
      }
      type="line"
      range={{
        xAxisBottom: ['auto', 'auto'],
      }}
      layout="vertical"
      variant="timeseries"
      data={data}
      elements={[
        { type: 'line', id: 'Paid' },
        { type: 'line', id: 'Organic' },
        { type: 'line', id: 'Earned' },
        { type: 'line', id: 'Converted' },
      ]}
      tickFormatter={{
        xAxisBottom: (date) =>
          `${new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)}`,
      }}
      renderTooltip={({ active, label, payload }) =>
        active && Array.isArray(payload) ? (
          <Flex direction="column" gap={2}>
            <Flex.Item>
              {payload.map(
                (payloadData: {|
                  dataKey: string,
                  color?: ?string,
                  fill?: ?string,
                  isLegend?: boolean,
                  legendType?: 'line' | 'rect',
                  name: string,
                  stroke?: ?string,
                  strokeDasharray?: ?(string | number),
                  value: number,
                |}) => (
                  <Flex key={payloadData.name} alignItems="center" gap={2}>
                    <ChartGraph.LegendIcon payloadData={payloadData} />
                    <Flex.Item flex="grow">
                      <Text size="100">{payloadData.name}</Text>
                    </Flex.Item>
                    <Text weight="bold" size="200">
                      {payloadData.value}
                    </Text>
                  </Flex>
                ),
              )}
            </Flex.Item>
            <Text color="subtle" size="100">
              {typeof label === 'number' ? new Intl.DateTimeFormat('en-US').format(label) : ''}
            </Text>
          </Flex>
        ) : null
      }
    />
  );
}
