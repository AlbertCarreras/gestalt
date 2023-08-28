// @flow strict-local
import { type Node, useId, useState } from 'react';
import {
  Bar as RechartsBar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line as RechartsLine,
  LineChart,
  ReferenceArea as RechartsReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Flex, Label, Switch, Text, useColorScheme } from 'gestalt';
import Marker from './Chart/Marker.js';
import { type DataVisualizationColors } from './Chart/types.js';
import usePatterns from './Chart/usePatterns.js';

type Props = {|
  scale?: 'linear' | 'time',
  /**
   * Prop description.
   */
  biaxial?: boolean,
  /**
   * Prop description.
   */ elements: $ReadOnlyArray<{|
    type: 'line' | 'bar',
    yAxis?: 'left' | 'right',
    id: string,
    color: DataVisualizationColors,
    stackedId?: string,
  |}>,
  /**
   * Prop description.
   */
  yAxisLeftLabel?: string,
  /**
   * Prop description.
   */
  yAxisRightLabel: string,
  /**
   * Prop description.
   */
  xAxisLabel: string,
  /**
   * Prop description.
   */
  domain?: [
    number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
    number | 'auto' | 'dataMin' | 'dataMax' | ((number) => number),
  ],
  /**
   * Prop description.
   */
  type: 'composed' | 'line' | 'bar',
  /**
   * Prop description.
   */
  height?: number | string,
  /**
   * Prop description.
   */
  width?: number | string,
  /**
   * Prop description.
   */
  data: $ReadOnlyArray<{|
    name: string,
    [string]: number,
  |}>,
  /**
   * Prop description.
   */
  layout?: 'horizontal' | 'vertical',
  /**
   * Prop description.
   */
  referenceAreas?: $ReadOnlyArray<{|
    id: string,
    isFront: boolean,
    x1: string,
    x2: string,
    y1: number,
    y2: number,
    yAxisId: string,
    stroke: string,
    strokeOpacity: number,
  |}>,
  /**
   * Prop description.
   */
  renderTooltip?: ({| active: ?boolean, payload: ?{ ... }, label: ?string |}) => Node,
|};

/**
 * [Chart](https://gestalt.pinterest.systems/web/chart) component should be used for ... on the page.
 * ![Chart light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart.spec.mjs-snapshots/Chart-chromium-darwin.png)
 * ![Chart dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart-dark.spec.mjs-snapshots/Chart-dark-chromium-darwin.png)
 */
function Chart({
  scale = 'linear',
  biaxial = false,
  domain = [0, 'auto'],
  layout = 'horizontal',
  type = 'composed',
  height = 400,
  width = '100%',
  data,
  referenceAreas = [],
  elements,
  renderTooltip,
  xAxisLabel,
  yAxisRightLabel,
  yAxisLeftLabel,
}: Props): Node {
  const [decalPattern, setDecalPattern] = useState(false);

  const id = useId();

  const theme = useColorScheme();

  const hexColor = (vizColor: DataVisualizationColors) =>
    theme[`colorDataVisualization${vizColor}`];

  const patterns = usePatterns();

  // eslint-disable-next-line react/no-unstable-nested-components
  function CustomTooltip({
    active,
    payload,
    label,
  }: {|
    active: boolean,
    payload: { ... },
    label: string,
  |}) {
    return (
      <Box maxWidth={300} padding={4} borderStyle="shadow" color="default" rounding={4}>
        {renderTooltip?.({ active, payload, label })}
      </Box>
    );
  }

  const isVertical = type === 'bar' && layout === 'vertical';
  const isHorizontal = !isVertical;

  let ChartType = ComposedChart;
  if (type === 'bar' && isHorizontal) {
    ChartType = BarChart;
  }
  if (type === 'line') {
    ChartType = LineChart;
  }

  // $FlowFixMe
  const chartElements = elements.map((values) => {
    const isBar = values.type === 'bar';
    const isLine = values.type === 'line';

    // Recharts doesn't recognize wrappers on their components
    if (isBar) {
      return (
        <RechartsBar
          isAnimationActive={false}
          key={values.id}
          {...(isHorizontal ? { yAxisId: values.yAxis } : {})}
          dataKey={values.id}
          barSize={20}
          stackId={values.stackedId}
          fill={decalPattern ? `url(#pattern-${values.color})` : hexColor(values.color)}
        />
      );
    }

    if (isLine) {
      return (
        <RechartsLine
          isAnimationActive={false}
          key={values.id}
          yAxisId={values.yAxis}
          dataKey={values.id}
          stroke={hexColor(values.color)}
        />
      );
    }

    return null;
  });

  const referenceAreasElements: $ReadOnlyArray<Node> = referenceAreas.map((values) => (
    // Recharts doesn't recognize wrappers on their components
    <RechartsReferenceArea
      key={values.id}
      isFront={values.isFront}
      x1={values.x1}
      x2={values.x2}
      y1={values.y1}
      y2={values.y2}
      yAxisId={values.yAxisId}
      stroke={values.stroke}
      strokeOpacity={values.strokeOpacity}
    />
  ));

  return (
    <Flex direction="column" gap={2}>
      <Flex alignItems="center" gap={2}>
        <Label htmlFor={id}>
          <Text size="200">Decal pattern</Text>
        </Label>
        <Switch
          id={id}
          onChange={() => setDecalPattern((currVal) => !currVal)}
          switched={decalPattern}
        />
      </Flex>
      <div className="_gestalt">
        <ResponsiveContainer width={width} height={height}>
          <ChartType
            accessibilityLayer={isHorizontal}
            data={data}
            layout={isVertical ? 'vertical' : 'horizontal'}
            margin={
              isVertical
                ? {
                    top: 20,
                    bottom: 20,
                  }
                : {}
            }
          >
            {patterns}
            <CartesianGrid stroke="#f5f5f5" />

            {isHorizontal ? (
              <XAxis
                dataKey="name"
                type="category"
                padding="gap"
                label={{ value: xAxisLabel, position: 'insideBottomLeft', offset: -5 }}
              />
            ) : null}
            {isHorizontal ? (
              <YAxis
                yAxisId="left"
                scale={scale}
                domain={domain}
                label={{ value: yAxisRightLabel, angle: -90, position: 'insideLeft' }}
              />
            ) : null}
            {isHorizontal && biaxial ? (
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{ value: yAxisLeftLabel, angle: -90, position: 'insideRight' }}
              />
            ) : null}
            {isVertical ? (
              <XAxis
                type="number"
                scale={scale}
                domain={domain}
                label={{ value: xAxisLabel, position: 'insideBottomLeft', offset: -5 }}
              />
            ) : null}
            {isVertical ? (
              <YAxis
                dataKey="name"
                type="category"
                scale="band"
                padding="gap"
                label={{ value: yAxisLeftLabel, angle: -90, position: 'insideLeft' }}
              />
            ) : null}
            {/*  $FlowFixMe[prop-missing]  */}
            <Tooltip content={<CustomTooltip />} />
            <Legend
              align="end"
              iconSize={16}
              iconType="square"
              margin={{ top: 50, left: 0, right: 0, bottom: 0 }}
            />
            {referenceAreas ? referenceAreasElements : null}
            {chartElements}
          </ChartType>
        </ResponsiveContainer>
      </div>
    </Flex>
  );
}

Chart.Marker = Marker;

export default Chart;
