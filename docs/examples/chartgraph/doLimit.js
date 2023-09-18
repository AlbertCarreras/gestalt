// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Paid': 100, 'Organic': 200 },
    { name: new Date(2023, 1, 2).getTime(), 'Paid': 2003, 'Organic': 200 },
    { name: new Date(2023, 2, 3).getTime(), 'Paid': 300, 'Organic': 500 },
    { name: new Date(2023, 3, 4).getTime(), 'Paid': 200, 'Organic': 300 },
    { name: new Date(2023, 4, 5).getTime(), 'Paid': 400, 'Organic': 400 },
    { name: new Date(2023, 5, 6).getTime(), 'Paid': 1005, 'Organic': 70 },
    { name: new Date(2023, 6, 7).getTime(), 'Paid': 500, 'Organic': 600 },
    { name: new Date(2023, 7, 8).getTime(), 'Paid': 600, 'Organic': 200 },
    { name: new Date(2023, 8, 8).getTime(), 'Paid': 400, 'Organic': 400 },
    { name: new Date(2023, 9, 8).getTime(), 'Paid': 1005, 'Organic': 500 },
    { name: new Date(2023, 10, 8).getTime(), 'Paid': 400, 'Organic': 550 },
    { name: new Date(2023, 11, 8).getTime(), 'Paid': 300, 'Organic': 700 },
  ];

  return (
    <ChartGraph
      title="Pin clicks over time"
      accessibilityLabel="Pin clicks over time (example)"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
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
      ]}
      tickFormatter={{
        yAxisLeft: (value) => `${value / 1000}K`,
        xAxisBottom: (date) =>
          `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            date,
          )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
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
